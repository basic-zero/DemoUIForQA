/* Accessibility and school CRM rules; source business gates remain authoritative. */
(() => {
  'use strict';
  const q=(s,r=document)=>r.querySelector(s), qa=(s,r=document)=>[...r.querySelectorAll(s)];
  const visible=e=>!!(e && e.getClientRects().length && getComputedStyle(e).visibility!=='hidden');
  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase();
  let serial=0, timer, activeModal=null, lastFocus=null, undoState=null, undoAfter=null;
  const dirty=new WeakSet(), pages=new WeakMap();
  const labels={dashboard:'Tổng quan',admissions:'Tuyển sinh',tasks:'Công việc / Hạn xử lý',inbox:'Tin nhắn',reports:'Báo cáo',campaigns:'Chiến dịch',operations:'Quy tắc / Cài đặt',omnichannel:'Tin nhắn đa kênh',forms:'Biểu mẫu đăng ký',outbound:'Chăm sóc hàng loạt',advisors:'Đội ngũ tuyển sinh',referrals:'Phụ huynh giới thiệu',targets:'Chỉ tiêu tuyển sinh'};
  const required=new Set(['nlParent','nlStudent','nlGrade','nlBu','nlCampus','nlProgram','nlIntake','nlSourceGroup','nlSourceParent','nlOwner','nlNext','edParent','edStudent','edGrade','edCampus','edProgram','edIntake','edOwner','edNext','edDue']);
  function fieldError(el,message){
    let err=document.getElementById(el.id+'-error');
    if(!err){err=document.createElement('span');err.id=el.id+'-error';err.className='qa-error';err.setAttribute('role','alert');el.insertAdjacentElement('afterend',err)}
    err.textContent=message;err.hidden=!message;el.setAttribute('aria-invalid',String(!!message));el.setAttribute('aria-describedby',err.id);return !message;
  }
  function validate(el){
    let message=''; const v=el.value.trim();
    if(required.has(el.id)&&!v)message='Vui lòng nhập hoặc chọn thông tin bắt buộc.';
    if(/phone/i.test(el.id)&&v&&!/^0\d{9}$/.test(v.replace(/[\s.-]/g,'')))message='Số điện thoại cần 10 chữ số, bắt đầu bằng 0. Ví dụ: 0912345678.';
    if(el.type==='email'&&v&&!el.validity.valid)message='Vui lòng nhập email đúng định dạng, ví dụ: ten@example.com.';
    if(el.type==='number'&&v&&(Number(v)<0||!Number.isFinite(Number(v))))message='Vui lòng nhập số hợp lệ, không nhỏ hơn 0.';
    return fieldError(el,message);
  }
  // Keep autosave failures visible instead of silently losing work.
  const sourceSave=save;
  save=function(){try{sourceSave()}catch(e){toast('Không thể lưu trên trình duyệt','Bộ nhớ có thể đã đầy. Hãy xuất bản sao JSON trước khi đóng trang.')}};
  toast=function(title,message=''){
    const host=q('#toast');if(!host)return;
    clearTimeout(window.__toast);
    const failed=/error|invalid|incomplete|required|blocked|missing|cannot|không thể|thiếu|lỗi/i.test(title);
    q('.qa-undo',host)?.remove();
    q('#toastTitle').textContent=(failed?'⚠ ':'✓ ')+title;q('#toastMessage').textContent=message;
    host.setAttribute('role',failed?'alert':'status');host.classList.toggle('qa-failure',failed);host.classList.toggle('qa-success',!failed);host.classList.add('show');
    if(!q('.qa-toast-close',host)){const b=document.createElement('button');b.className='btn qa-toast-close';b.textContent='Đóng thông báo';b.onclick=()=>host.classList.remove('show');host.append(b)}
    const expire=()=>{if(!failed)window.__toast=setTimeout(()=>host.classList.remove('show'),4500)};
    host.onmouseenter=()=>clearTimeout(window.__toast);host.onmouseleave=expire;expire();
  };
  const previousNext=leadWizardNext;
  leadWizardNext=function(){
    const fields=qa('input,select,textarea',q('#leadWizardBody')).filter(visible);let first=null;
    fields.forEach(el=>{if(!validate(el)&&!first)first=el});
    if(state.wizardStep===1&&!q('#nlPhone').value.trim()&&!q('#nlEmail').value.trim()){fieldError(q('#nlPhone'),'Vui lòng nhập số điện thoại hoặc email để liên hệ.');first ||=q('#nlPhone')}
    if(first){first.focus();first.scrollIntoView({block:'center'});return}
    const before=state.opportunities.length;previousNext();
    if(state.opportunities.length>before)dirty.delete(q('#leadModalOverlay'));
  };
  q('#leadNextBtn').onclick=()=>leadWizardNext();
  const sourceApply=applyStage;
  applyStage=function(){
    let firstInvalid=null;qa('input[type=number]',q('#stageModalOverlay')).filter(visible).forEach(el=>{if(!validate(el))firstInvalid ||=el});if(firstInvalid){firstInvalid.focus();return}
    const result=validateStage();
    if(!result.ok){sourceApply();const msg=q('#stageValidationMessage');msg.setAttribute('role','alert');msg.tabIndex=-1;msg.focus();return}
    undoState=JSON.stringify(state);sourceApply();dirty.delete(q('#stageModalOverlay'));showUndo();
  };
  q('#confirmStageBtn').onclick=()=>applyStage();
  function businessSnapshot(){return JSON.stringify([state.households,state.students,state.opportunities,state.tasks,state.audit,state.targets])}
  function showUndo(){clearTimeout(window.__toast);window.__toast=setTimeout(()=>q('#toast').classList.remove('show'),8000);undoAfter=businessSnapshot();const host=q('#toast');q('.qa-undo',host)?.remove();const b=document.createElement('button');b.className='btn qa-undo';b.textContent='Hoàn tác thay đổi';b.onclick=()=>{if(!undoState)return;if(undoAfter!==businessSnapshot()){toast('Không thể hoàn tác','Đã có thay đổi khác sau thao tác này. Hãy mở hồ sơ để điều chỉnh trực tiếp.');return}state=JSON.parse(undoState);undoState=null;save();renderAll();if(state.activeOpp)renderDrawer();b.remove();toast('Đã hoàn tác','Đã khôi phục trạng thái trước khi chuyển giai đoạn.')};host.append(b)}
  // Batch demo sending has a real, explicit audience confirmation.
  const sourceBroadcast=v10SendBroadcast;
  v10SendBroadcast=function(){const n=new Set(v10OutboundAudience().map(x=>x.h.id)).size;if(n&&!confirm(`Ghi nhận gửi thử tới ${n} phụ huynh? Đây là mô phỏng trong trình duyệt, không gửi tin nhắn thật.`))return;sourceBroadcast()};
  // Global filters are always visible and use the original data model.
  const filters=document.createElement('div');filters.className='qa-filters';filters.setAttribute('aria-label','Lọc hồ sơ tuyển sinh');
  const specs=[['school','Đơn vị',()=>['All Schools','CIS','SSV','CVK','MLC']],['ownerFilter','Phụ trách',()=>['All',...new Set(state.opportunities.map(o=>o.owner))]],['qaSla','Hạn xử lý',()=>['All','Quá hạn','Hôm nay','Còn hạn']],['sourceFilter','Nguồn',()=>['All',...new Set(state.opportunities.map(o=>o.sourceParent))]],['qaCampaign','Chiến dịch',()=>['All',...new Set(state.opportunities.map(o=>o.campaign))]]];
  specs.forEach(([key,label,values])=>{const l=document.createElement('label');l.textContent=label;const sel=document.createElement('select');sel.id='qa-'+key;sel.dataset.qaFilter=key;values().filter(Boolean).forEach(v=>sel.add(new Option(v==='All'||v==='All Schools'?'Tất cả':v,v)));sel.value=state[key]|| (key==='school'?'All Schools':'All');l.append(sel);filters.append(l);sel.onchange=()=>{state[key]=sel.value;save();renderAll();refreshCount()}});
  const clear=document.createElement('button');clear.className='btn';clear.textContent='Xóa bộ lọc';clear.onclick=()=>{specs.forEach(([key])=>{state[key]=key==='school'?'All Schools':'All';q('#qa-'+key).value=state[key]});state.savedView='all';state.stageFilter='All';q('#searchInput').value='';save();renderAll();refreshCount()};filters.append(clear);
  const count=document.createElement('div');count.className='qa-count';count.setAttribute('role','status');filters.append(count);q('.topbar').after(filters);
  const sourceFiltered=filteredOpps, sourcePipeline=pipelineOpps;
  function extraFilter(rows){return rows.filter(o=>(!state.qaCampaign||state.qaCampaign==='All'||o.campaign===state.qaCampaign)&&(!state.qaSla||state.qaSla==='All'||(state.qaSla==='Quá hạn'?o.dueAt<Date.now():state.qaSla==='Hôm nay'?new Date(o.dueAt).toDateString()===new Date().toDateString():o.dueAt>=Date.now())))}
  filteredOpps=function(closed=false){return extraFilter(sourceFiltered(closed))};
  pipelineOpps=function(){const allowed=new Set(filteredOpps(true).map(o=>o.id));return sourcePipeline().filter(o=>allowed.has(o.id))};
  function refreshCount(){const n=filteredOpps(true).length;const t=`Tìm thấy ${n} / ${state.opportunities.length} cơ hội tuyển sinh. Bộ lọc này áp dụng cho danh sách và bảng giai đoạn.`;if(count.textContent!==t)count.textContent=t;specs.forEach(([key])=>{const el=q('#qa-'+key);if(el.value!==state[key]&&state[key])el.value=state[key];el.classList.toggle('qa-filter-active',!!state[key]&&!['All','All Schools'].includes(state[key]))})}
  const sourceSearch=q('#searchInput').oninput;q('#searchInput').setAttribute('aria-label','Tìm phụ huynh, học sinh, số điện thoại hoặc mã cơ hội');
  q('#searchInput').oninput=function(e){clearTimeout(timer);timer=setTimeout(()=>{sourceSearch?.call(this,e);refreshCount()},300)};
  const clearSearch=document.createElement('button');clearSearch.textContent='Xóa';clearSearch.className='btn';clearSearch.setAttribute('aria-label','Xóa từ khóa tìm kiếm');clearSearch.onclick=()=>{q('#searchInput').value='';q('#searchInput').dispatchEvent(new Event('input'));q('#searchInput').focus()};q('.global-search').append(clearSearch);
  function paginate(table){
    if(!table.tBodies[0])return; if(!table.tBodies[0].rows.length){table.parentElement.querySelector(':scope > .qa-pagination')?.remove();pages.delete(table);table.tBodies[0].innerHTML='<tr><td colspan="20" class="qa-empty">Không tìm thấy hồ sơ phù hợp. Hãy thử từ khóa khác hoặc xóa bộ lọc.</td></tr>';return}const body=table.tBodies[0],rows=[...body.rows];if(rows.length===1&&rows[0].cells.length===1)return;
    let model=pages.get(table);if(!model||model.rows[0]!==rows[0]){model={page:1,size:model?.size||20,rows};pages.set(table,model)}
    let bar=table.parentElement.querySelector(':scope > .qa-pagination');
    if(!bar){bar=document.createElement('div');bar.className='qa-pagination';table.after(bar)}
    if(!bar.dataset.bound){bar.dataset.bound='1';bar.innerHTML='<span class="qa-range"></span><label>Số dòng <select aria-label="Số dòng mỗi trang"><option>10</option><option selected>20</option><option>50</option></select></label><button class="btn qa-prev">Trang trước</button><span class="qa-page" aria-current="page"></span><button class="btn qa-next">Trang sau</button>';q('select',bar).onchange=()=>{model=pages.get(table);model.size=+q('select',bar).value;model.page=1;paint()};q('.qa-prev',bar).onclick=()=>{model=pages.get(table);model.page--;paint()};q('.qa-next',bar).onclick=()=>{model=pages.get(table);model.page++;paint()}}
    function paint(){model=pages.get(table);const total=model.rows.length,max=Math.max(1,Math.ceil(total/model.size));model.page=Math.max(1,Math.min(model.page,max));model.rows.forEach((r,i)=>r.hidden=i<(model.page-1)*model.size||i>=model.page*model.size);setText(q('.qa-range',bar),`Hiển thị ${total?(model.page-1)*model.size+1:0}–${Math.min(total,model.page*model.size)} / ${total} kết quả`);setText(q('.qa-page',bar),`Trang ${model.page} / ${max}`);q('.qa-prev',bar).disabled=model.page===1;q('.qa-next',bar).disabled=model.page===max;bar.hidden=false}
    const heads=qa('thead th',table);if(heads.length>7&&!table.dataset.qaColumns){table.dataset.qaColumns='1';table.classList.add('qa-compact-columns');const toggle=document.createElement('button');toggle.className='btn qa-column-toggle';toggle.textContent='Hiện thêm cột';toggle.setAttribute('aria-expanded','false');toggle.onclick=()=>{const compact=table.classList.toggle('qa-compact-columns');toggle.textContent=compact?'Hiện thêm cột':'Thu gọn cột';toggle.setAttribute('aria-expanded',String(!compact))};table.before(toggle)}heads.forEach((th,i)=>{th.scope='col';model.rows.forEach(row=>{const td=row.cells[i];if(td&&!td.dataset.label)td.dataset.label=th.textContent.trim()});if(th.dataset.qaSort||th.querySelector('button,input')||th.hasAttribute('data-camp-sort'))return;th.dataset.qaSort='1';const b=document.createElement('button');b.className='qa-sort';b.textContent=th.textContent.trim()+' ↕';th.textContent='';th.append(b);b.onclick=()=>{model=pages.get(table);const asc=th.getAttribute('aria-sort')!=='ascending';heads.forEach(h=>h.removeAttribute('aria-sort'));th.setAttribute('aria-sort',asc?'ascending':'descending');model.rows.sort((a,b)=>a.cells[i].textContent.localeCompare(b.cells[i].textContent,'vi',{numeric:true})*(asc?1:-1));model.rows.forEach(r=>body.append(r));model.page=1;paint()}});paint();
    const footer=table.closest('.data-card')?.querySelector('.table-footer');if(footer)footer.hidden=true;
  }
  function setText(el,value){if(el.textContent!==value)el.textContent=value}
  function enhance(){
    syncNavigation();
    qa('.view.active table,.modal-overlay.open table,.overlay.open table').forEach(paginate);
    [['nlParent','Thông tin phụ huynh'],['nlStudent','Thông tin học sinh'],['nlBu','Thông tin tuyển sinh']].forEach(([id,text])=>{const f=q('#'+id)?.closest('.field');if(f&&!f.previousElementSibling?.classList.contains('qa-group-title')){const h=document.createElement('h3');h.className='qa-group-title';h.textContent=text;f.before(h)}if(f?.previousElementSibling?.classList.contains('qa-group-title'))f.previousElementSibling.hidden=f.hidden});
    qa('input,select,textarea').forEach(el=>{
      if(!el.id)el.id='qa-field-'+(++serial);const label=el.closest('label');if(label&&el.type!=='search')label.htmlFor=el.id;
      if(!label&&!el.labels?.length&&!el.getAttribute('aria-label'))el.setAttribute('aria-label',el.title||el.placeholder||'Chọn thông tin');
      if(required.has(el.id)){el.required=true;if(label&&!label.querySelector('.qa-required')){const star=document.createElement('b');star.className='qa-required';star.textContent=' *';(q('span',label)||label).append(star)}}
      if(el.tagName==='SELECT'&&el.options.length>10&&!el.dataset.qaSearch){el.dataset.qaSearch='1';const input=document.createElement('input');input.type='search';input.placeholder='Tìm trong danh sách…';input.setAttribute('aria-label','Tìm lựa chọn trong danh sách');input.addEventListener('input',()=>{const text=norm(input.value);[...el.options].forEach(o=>o.hidden=!!text&&!o.selected&&!norm(o.textContent).includes(text))});const wrap=document.createElement('span');wrap.className='qa-select-search';el.before(wrap);wrap.append(input)}
      if(!el.dataset.qaBound){el.dataset.qaBound='1';if(el.closest('.modal-overlay,.overlay')&&el.type!=='search'&&el.matches('input:not([type=checkbox]):not([type=radio]),textarea'))el.addEventListener('blur',()=>validate(el))}
      if(/phone/i.test(el.id))el.inputMode='tel';if(el.type==='number')el.min='0';
    });
    qa('[data-view]').forEach(b=>{if(b.classList.contains('active'))b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');const label=labels[b.dataset.view];if(label){b.setAttribute('aria-label',label);b.title=label}});
    qa('button').forEach(b=>{if(!b.getAttribute('aria-label')&&!b.textContent.trim().match(/[\p{L}]{2}/u))b.setAttribute('aria-label',b.title||(/close/i.test(b.id)||b.textContent.includes('×')?'Đóng cửa sổ':'Mở tùy chọn'));if(b.disabled){b.setAttribute('aria-disabled','true');if(!b.title)b.title='Chưa khả dụng: kiểm tra quyền truy cập, điều kiện hoặc vị trí trang.'}else b.removeAttribute('aria-disabled')});
    qa('[data-open-opp],.opp-card,.conversation,.queue-row').forEach(el=>{if(!el.matches('button,a,input')&&!el.hasAttribute('tabindex')){el.tabIndex=0;el.setAttribute('role','button')}});
    qa('.subtab-bar,.drawer-tabs').forEach(list=>{list.setAttribute('role','tablist');qa('button',list).forEach(b=>{b.setAttribute('role','tab');b.setAttribute('aria-selected',String(b.classList.contains('active')))})});
    qa('.view').forEach(v=>{const prim=qa('.btn.primary',v).filter(visible);prim.forEach((b,i)=>b.classList.toggle('qa-secondary',i>0))});q('#newLeadBtn')?.classList.add('qa-secondary');
    qa('.modal-overlay,.overlay').forEach(root=>{const dialog=q('.modal,.modal-card,.opportunity-drawer',root)||root;dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');const h=q('h2',dialog);if(h){h.id ||= 'qa-dialog-'+(++serial);dialog.setAttribute('aria-labelledby',h.id)}root.inert=!root.classList.contains('open')});
    const open=qa('.modal-overlay.open');const modal=open.at(-1)||q('.overlay.open');
    qa('.modal-overlay.open,.overlay.open').forEach(root=>{const suspended=root!==modal;root.classList.toggle('qa-suspended',suspended);root.inert=suspended;root.setAttribute('aria-hidden',String(suspended))});
    if(modal!==activeModal){const previous=activeModal;activeModal=modal;q('.app-shell').inert=!!modal;if(modal){if(!previous)lastFocus=document.activeElement;const target=qa('button,input,select,textarea,[tabindex]',modal).find(visible);target?.focus()}else{lastFocus?.focus();dirty.delete(previous)}}
    refreshCount();
  }
  document.addEventListener('input',e=>{const m=e.target.closest('.modal-overlay,.overlay');if(m)dirty.add(m)});
  document.addEventListener('change',e=>{const m=e.target.closest('.modal-overlay,.overlay');if(m)dirty.add(m)});
  document.addEventListener('click',e=>{const b=e.target.closest('button');const root=e.target.closest('.modal-overlay,.overlay');if(root&&dirty.has(root)&&(e.target===root||b?.matches('[data-close-modal],.close-btn')||/cancel|close|hủy|đóng/i.test(b?.textContent||''))){if(!confirm('Bạn có thay đổi chưa lưu. Đóng và bỏ những thay đổi này?')){e.preventDefault();e.stopImmediatePropagation()}else dirty.delete(root)}},true);
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&activeModal){e.stopImmediatePropagation();e.preventDefault();if(dirty.has(activeModal)&&!confirm('Bạn có thay đổi chưa lưu. Đóng và bỏ những thay đổi này?'))return;dirty.delete(activeModal);activeModal.classList.remove('open');enhance();return}
    if(e.key==='Tab'&&activeModal){const items=[...qa('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),a[href],[tabindex="0"]',activeModal),...qa('#toast.show button')].filter(visible);const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}
    if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)&&e.target.matches('[role=tab]')){const tabs=qa('[role=tab]',e.target.parentElement),i=tabs.indexOf(e.target);const next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;e.preventDefault();tabs[next].click();tabs[next].focus()}
    if(['Enter',' '].includes(e.key)&&e.target.matches('[role=button]:not(button):not(input)')){e.preventDefault();e.target.click()}
  },true);
  window.addEventListener('beforeunload',e=>{if(activeModal&&dirty.has(activeModal)){e.preventDefault();e.returnValue=''}});
  // Observe source rendering without feeding our own mutations back into the observer.
  let refreshPending=false;
  const observer=new MutationObserver(()=>{if(refreshPending)return;refreshPending=true;setTimeout(()=>{observer.disconnect();try{enhance()}finally{refreshPending=false;watch()}},40)});
  function watch(){observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class']})}
  q('.rail-logo').innerHTML='<span aria-hidden="true">CIS</span>';q('.rail-logo').onclick=()=>setView('dashboard');
  if(window.CISS_I18N_AUDIT)Object.assign(window.CISS_I18N_AUDIT.EN_VI,{'Commercial reporting scope':'Phạm vi báo cáo tuyển sinh','Grade / Course':'Khối / Khóa học','Source':'Nguồn','Admission Officer':'Nhân viên tuyển sinh','Outbound Marketing':'Chăm sóc hàng loạt','Targets & Budget':'Chỉ tiêu & Ngân sách','Opt-in Forms':'Biểu mẫu đăng ký','New Lead':'Tạo hồ sơ mới','Leads':'Khách hàng tiềm năng','Pipeline':'Giai đoạn tuyển sinh','CISS Commercial Dashboard':'Tổng quan tuyển sinh CISS'});
  q('#mobileV10More').onclick=()=>{v10OpenModal('Chức năng CRM','Chọn nghiệp vụ cần thao tác.','<div class="more-grid">'+Object.entries(labels).map(([id,text])=>'<button class="btn" data-qa-view="'+id+'">'+text+'</button>').join('')+'</div>');qa('[data-qa-view]').forEach(b=>b.onclick=()=>{q('#v10Modal').classList.remove('open');setView(b.dataset.qaView)})};

  // Group the 13 source workspaces under seven business navigation entries.
  let navigationReady=false;
  function syncNavigation(){
    if(!navigationReady)return;
    const view=q('.view.active')?.id.replace('view-','');
    qa('.qa-nav-group').forEach(group=>{const active=!!group.querySelector(`[data-view="${view}"]`);group.classList.toggle('qa-group-active',active);if(active)group.open=true});

  }
  function organizeNavigation(){
    const rail=q('.rail-group');rail.setAttribute('role','navigation');rail.setAttribute('aria-label','Điều hướng nghiệp vụ');
    const groups=[['Liên lạc phụ huynh',['inbox','omnichannel']],['Nguồn tuyển sinh',['campaigns','forms','outbound','referrals']],['Quản trị',['advisors','targets','operations']]];
    groups.forEach(([name,views])=>{const d=document.createElement('details');d.className='qa-nav-group';const summary=document.createElement('summary');summary.textContent=name;d.append(summary);views.forEach(v=>{const b=rail.querySelector(`[data-view="${v}"]`);if(b)d.append(b)});rail.append(d)});
    navigationReady=true;syncNavigation();
  }
  // Four short steps retain the source's identity matching and creation logic.
  let wizardPage=1;
  const wizardFields=[['nlParent','nlPhone','nlEmail','nlDistrict'],['nlStudent','nlGrade'],['nlBu','nlCampus','nlProgram','nlIntake'],['nlSourceGroup','nlSourceParent','nlSourceChild','nlCampaignGroup','nlCampaign','nlOwner','nlConsent','nlNext']];
  const renderSourceWizard=renderLeadWizard;
  renderLeadWizard=function(){
    renderSourceWizard();
    const show=new Set(wizardFields[wizardPage-1]);
    qa('.field',q('#leadWizardBody')).forEach(f=>f.hidden=!show.has(q('input,select,textarea',f)?.id));
    q('#wizardLabel').textContent=`Bước ${wizardPage}/4 · ${['Phụ huynh','Học sinh','Nhu cầu tuyển sinh','Nguồn & phụ trách'][wizardPage-1]}`;
    q('#leadBackBtn').classList.toggle('hidden',wizardPage===1);
    q('#leadNextBtn').textContent=wizardPage===4?'Tạo hồ sơ tuyển sinh':'Tiếp tục';
    const progress=q('.wizard-progress'),caption=q('#wizardLabel');qa('i',progress).forEach(el=>el.remove());for(let i=0;i<4;i++){const dot=document.createElement('i');dot.classList.toggle('active',i<wizardPage);progress.insertBefore(dot,caption)}
  };
  const openSourceWizard=openLeadWizard;
  openLeadWizard=function(){wizardPage=1;openSourceWizard()};
  ['newLeadBtn','dashNewLead','admissionNewLead','quickCreate'].forEach(id=>{const b=q('#'+id);if(b){b.removeEventListener('click',openSourceWizard);b.addEventListener('click',()=>openLeadWizard())}});
  // Existing source entry points also call the wrapper when they open the wizard.
  const guardedNext=leadWizardNext;
  leadWizardNext=function(){
    const controls=qa('input,select,textarea',q('#leadWizardBody')).filter(visible);let bad=null;
    controls.forEach(el=>{if(!validate(el))bad ||=el});
    if(wizardPage===1&&!q('#nlPhone').value.trim()&&!q('#nlEmail').value.trim()){fieldError(q('#nlPhone'),'Nhập số điện thoại hoặc email để liên hệ.');bad ||=q('#nlPhone')}
    if(bad){bad.focus();return}
    if(wizardPage===1){state.leadDraft={...state.leadDraft,...collectLeadStep1()};wizardPage=2;renderLeadWizard();return}
    if(wizardPage===2){wizardPage=3;guardedNext();if(state.wizardStep===1)wizardPage=2;return}
    if(wizardPage===3){state.leadDraft=collectLeadStep2();wizardPage=4;renderLeadWizard();return}
    guardedNext();
  };
  q('#leadNextBtn').onclick=()=>leadWizardNext();
  q('#leadBackBtn').onclick=()=>{state.leadDraft=state.wizardStep===1?{...state.leadDraft,...collectLeadStep1()}:collectLeadStep2();wizardPage=Math.max(1,wizardPage-1);state.wizardStep=wizardPage<=2?1:2;renderLeadWizard()};
  const sourceEdit=saveEdit;
  saveEdit=function(){let bad=null;qa('input,select,textarea',q('#editModalOverlay')).filter(e=>e.type!=='search').forEach(el=>{if(!validate(el))bad ||=el});if(bad){bad.focus();return}
    if(!confirm(`Lưu thay đổi hồ sơ ${q('#edStudent').value}? Thông tin phụ huynh, học sinh và cơ hội sẽ được cập nhật.`))return;
    const before=JSON.stringify(state);sourceEdit();if(!q('#editModalOverlay').classList.contains('open')){dirty.delete(q('#editModalOverlay'));undoState=before;showUndo()}
  };
  q('#saveEditBtn').onclick=()=>saveEdit();
  // Explicit help and a demo label keep prototype capabilities understandable.
  const help=document.createElement('button');help.className='btn';help.id='qaHelp';help.textContent='Trợ giúp';q('.top-actions').append(help);
  help.onclick=()=>v10OpenModal('Hướng dẫn sử dụng','CRM tuyển sinh · dữ liệu mẫu',`<div class="qa-guide"><h3>Tạo hồ sơ</h3><p>Chọn Tạo hồ sơ mới. Điền lần lượt phụ huynh, học sinh, nhu cầu tuyển sinh, nguồn và người phụ trách.</p><h3>Chuyển giai đoạn</h3><p>Mở hồ sơ trong Tuyển sinh, chọn cập nhật giai đoạn và hoàn thành các điều kiện. Nhập học yêu cầu xác nhận tài chính.</p><h3>Tìm và lọc</h3><p>Gõ tên không dấu, số điện thoại hoặc mã hồ sơ. Chọn đơn vị, người phụ trách hoặc nguồn để thu hẹp kết quả. Xóa bộ lọc để xem lại tất cả.</p><h3>Sao lưu</h3><p>Dữ liệu tự lưu trong trình duyệt này. Xuất JSON trong phần cài đặt để có bản sao trước khi đổi máy.</p><p>Tin nhắn, biểu mẫu và gửi hàng loạt trong template là mô phỏng, chưa kết nối dịch vụ bên ngoài.</p></div>`,'<button class="btn primary" id="qaHelpDone">Đã hiểu</button>');
  document.addEventListener('click',e=>{if(e.target.id==='qaHelpDone')q('#v10Modal').classList.remove('open')});
  q('#helpRail').onclick=()=>help.click();q('#helpRail').textContent='? Trợ giúp';
  q('.demo-tag').textContent='Mẫu 05';
  document.addEventListener('blur',e=>{if(/phone/i.test(e.target.id)&&e.target.value){const v=e.target.value.replace(/\D/g,'');if(/^0\d{9}$/.test(v))e.target.value=`${v.slice(0,4)} ${v.slice(4,7)} ${v.slice(7)}`}},true);
  // Add associations between tabs and their panels; keep source handlers intact.
  function associateTabs(){
    const mappings=[['data-admission-tab','admission-'],['data-ops-tab','ops-'],['data-drawer-tab','drawer-']];
    mappings.forEach(([attr,prefix])=>qa(`[${attr}]`).filter(b=>b.matches('.subtab,.drawer-tabs button')).forEach(b=>{const panel=q('#'+prefix+b.getAttribute(attr));if(panel){b.id ||= 'qa-tab-'+(++serial);b.setAttribute('aria-controls',panel.id);panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',b.id)}}));
  }
  const oldEnhance=enhance;
  enhance=function(){oldEnhance();associateTabs()};
  organizeNavigation();

  state.lang='vi';switchLanguage('vi');window.CISS_I18N_AUDIT?.setLang('vi');renderAll();enhance();watch();
})();
