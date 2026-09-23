/* User-centred presentation. Source records, permissions and stage gates remain authoritative. */
(() => {
  'use strict';
  const $ = (s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase();
  const date=v=>Number.isFinite(Number(v))?new Intl.DateTimeFormat('vi-VN',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}).format(new Date(Number(v))):'Chưa đặt lịch';
  const stageName={'Leads':'Mới tiếp nhận','Marketing Qualified Leads':'Đủ điều kiện','Marketing Unqualified Leads':'Không phù hợp','Appointment':'Đã đặt lịch','Visit':'Đã tham quan','In Consideration':'Đang cân nhắc','Waiting':'Chờ phản hồi','New Enrollment':'Đã nhập học','No Sign-up':'Không đăng ký','Withdraw':'Rút hồ sơ'};
  const names={dashboard:'Không gian làm việc',admissions:'Hồ sơ tuyển sinh',tasks:'Công việc',reports:'Báo cáo',campaigns:'Chiến dịch',inbox:'Hộp thư',omnichannel:'Tin nhắn đa kênh',forms:'Biểu mẫu đăng ký',outbound:'Chăm sóc phụ huynh',advisors:'Đội ngũ tư vấn',referrals:'Phụ huynh giới thiệu',targets:'Chỉ tiêu',operations:'Quản trị'};
  const owners=[...new Set(state.opportunities.map(o=>o.owner).filter(Boolean))];
  state.ux ||= {};
  state.ux.owner ||= owners.find(o=>norm(o).includes('ngoc hien'))||owners[0]||'All';
  state.ux.queue ||= 'urgent';
  let homePage=1, timer, appointmentMode="upcoming";
  function schedule(){clearTimeout(timer);timer=setTimeout(()=>{if($('#view-dashboard').classList.contains('active'))renderHome()},90)}
  const persist=save;save=function(){const result=persist();schedule();return result};
  const shell=$('.app-shell');shell.classList.add('ux-shell');
  const rail=$('.icon-rail');
  const brand=document.createElement('button');brand.className='ux-brand';brand.innerHTML='<span class="ux-brand-icon">c</span><span>CISS<span class="ux-brand-sub">Admissions workspace</span></span>';brand.onclick=()=>setView('dashboard');rail.prepend(brand);
  const school=$('#schoolPicker');rail.insertBefore(school,$('.rail-group'));
  const user=$('.user-card');user.classList.add('ux-user');rail.append(user);
  const help=$('#qaHelp');rail.insertBefore(help,user);
  const preferences=document.createElement('details');preferences.className='ux-preferences';preferences.innerHTML='<summary aria-label="Tùy chọn ngôn ngữ và vai trò">Tùy chọn <span aria-hidden="true">⌄</span></summary><div class="ux-preferences-panel"><strong>Cá nhân hóa</strong></div>';
  const prefs=$('.ux-preferences-panel',preferences);const roleLabel=document.createElement('label');roleLabel.textContent='Vai trò sử dụng';roleLabel.append($('#roleSelector'));prefs.append(roleLabel);prefs.append($('#languageToggle'));$('.top-actions').prepend(preferences);
  const location=document.createElement('span');location.id='ux-location';$('.topbar').prepend(location);
  $('#searchInput').placeholder='Tìm phụ huynh, học sinh, số điện thoại…';
  $('#notificationBtn').setAttribute('aria-label','Xem nhắc việc quá hạn');$('#topAvatarBtn').setAttribute('aria-label','Mở cài đặt');

  // Preserve the commercial dashboard as a separate, deliberate analysis view.
  const dashboard=$('#view-dashboard'), analytics=document.createElement('div');analytics.id='ux-analytics';
  while(dashboard.firstChild)analytics.append(dashboard.firstChild);
  const home=document.createElement('div');home.id='ux-workspace';
  const switcher=document.createElement('div');switcher.className='ux-workspace-tabs';switcher.setAttribute('role','tablist');switcher.setAttribute('aria-label','Chế độ tổng quan');
  switcher.innerHTML='<button id="ux-tab-work" role="tab" aria-controls="ux-workspace" aria-selected="true" class="active">Công việc hôm nay</button><button id="ux-tab-insights" role="tab" aria-controls="ux-analytics" aria-selected="false">Phân tích tuyển sinh</button>';
  dashboard.append(switcher,home,analytics);home.setAttribute('role','tabpanel');home.setAttribute('aria-labelledby','ux-tab-work');analytics.setAttribute('role','tabpanel');analytics.setAttribute('aria-labelledby','ux-tab-insights');
  function homeMode(mode){state.ux.mode=mode;home.hidden=mode==='insights';analytics.hidden=mode!=='insights';$$('button',switcher).forEach(b=>{const active=(b.id==='ux-tab-insights')===(mode==='insights');b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active))});if(mode!=='insights')renderHome();else renderCommercialDashboard()}
  $('#ux-tab-work').onclick=()=>homeMode('work');$('#ux-tab-insights').onclick=()=>homeMode('insights');
  switcher.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const b=e.target.id==='ux-tab-work'?$('#ux-tab-insights'):$('#ux-tab-work');b.click();b.focus()}});
  // The detailed filters are revealed only in the workspace where they apply.
  const filters=$('.qa-filters'), more=document.createElement('details');more.className='ux-more-filters';more.innerHTML='<summary>Nguồn & chiến dịch</summary><div></div>';
  ['#qa-sourceFilter','#qa-qaCampaign'].forEach(id=>{const label=$(id)?.closest('label');if(label)$('div',more).append(label)});filters.insertBefore(more,$('.qa-count',filters));
  const oldSearch=$('#searchInput').oninput;$('#searchInput').oninput=function(e){oldSearch?.call(this,e);homePage=1;schedule()};
  const setSourceView=setView;setView=function(view){const result=setSourceView(view);document.body.dataset.workspaceView=view;location.textContent=names[view]||'CRM';if(view==='dashboard')renderHome();return result};
  const sourceRenderAll=renderAll;renderAll=function(){const result=sourceRenderAll();schedule();return result};

  function scopedRows(){const query=norm($('#searchInput').value);return state.opportunities.filter(o=>{
    if(state.school!=='All Schools'&&o.bu!==state.school)return false;
    if(state.ux.owner!=='All'&&o.owner!==state.ux.owner)return false;
    const h=householdObj(state,o.householdId),s=studentObj(state,o.studentId);
    return !query||norm([h?.primaryName,h?.phone,s?.name,o.id,o.nextAction].join(' ')).includes(query);
  })}
  function dueInfo(o){const now=Date.now(),end=new Date().setHours(23,59,59,999);return o.dueAt<now?['Quá hạn','danger']:o.dueAt<=end?['Trong hôm nay','warning']:['Sắp tới','neutral']}
  function goToLeads(stage){state.ownerFilter=state.ux.owner;state.stageFilter=stage||'All';state.sourceFilter='All';state.qaCampaign='All';state.qaSla='All';state.savedView='all';setAdmissionTab('list');renderAll()}
  function renderHome(){
    const rows=scopedRows(),open=rows.filter(o=>!closedStages.has(o.stage)&&o.stage!=='New Enrollment'),now=Date.now(),end=new Date().setHours(23,59,59,999),start=new Date().setHours(0,0,0,0);
    const overdue=open.filter(o=>o.dueAt<now),today=open.filter(o=>o.dueAt>=now&&o.dueAt<=end),newLeads=open.filter(o=>o.stage==='Leads');
    const scheduled=rows.filter(o=>o.stage==='Appointment'&&o.appointmentAt>=start).sort((a,b)=>a.appointmentAt-b.appointmentAt);
    const appointmentsToday=scheduled.filter(o=>o.appointmentAt<=end);
    const appointments=scheduled.filter(o=>o.appointmentAt>=now);
    let queue=state.ux.queue==='urgent'?overdue:state.ux.queue==='today'?today:open;
    queue=[...queue].sort((a,b)=>a.dueAt-b.dueAt);const pages=Math.max(1,Math.ceil(queue.length/6));homePage=Math.min(homePage,pages);
    const page=queue.slice((homePage-1)*6,homePage*6),shortName=state.ux.owner==='All'?'đội tuyển sinh':state.ux.owner.split(' ').slice(-2).join(' ');
    home.innerHTML=`<header class="ux-home-heading"><div><div class="ux-eyebrow">KHÔNG GIAN TUYỂN SINH</div><h1>Chào ${safe(shortName)} <span class="ux-greeting-dot">.</span></h1><p>Ưu tiên đúng hồ sơ. Chủ động lần tư vấn tiếp theo.</p></div><button class="btn primary ux-create">＋ Tạo hồ sơ</button></header>
      <div class="ux-scope"><div class="ux-date">${safe(new Intl.DateTimeFormat('vi-VN',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date()))}<span>${safe(state.school==='All Schools'?'Tất cả trường':state.school)}</span><label class="ux-mobile-school">Đơn vị<select id="ux-school">${['All Schools',...new Set(state.opportunities.map(o=>o.bu))].map(b=>`<option value="${safe(b)}" ${state.school===b?'selected':''}>${b==='All Schools'?'Tất cả trường':safe(b)}</option>`).join('')}</select></label></div><label>Đang xem công việc của<select id="ux-owner"><option value="All">Tất cả tư vấn viên</option>${owners.map(o=>`<option value="${safe(o)}" ${state.ux.owner===o?'selected':''}>${safe(o)}</option>`).join('')}</select></label></div>
      <div class="ux-metrics"><button class="ux-metric" data-metric="open"><span class="ux-metric-icon">▤</span><span>Hồ sơ đang phụ trách</span><strong>${open.length.toLocaleString('vi-VN')}</strong><small>Xem danh sách hồ sơ <b>↗</b></small></button><button class="ux-metric ux-metric-danger" data-metric="urgent"><span class="ux-metric-icon">◷</span><span>Cần liên hệ lại</span><strong>${overdue.length.toLocaleString('vi-VN')}</strong><small>Đã quá hạn xử lý <b>↗</b></small></button><button class="ux-metric" data-metric="appointments"><span class="ux-metric-icon">▦</span><span>Lịch hẹn hôm nay</span><strong>${appointmentsToday.length}</strong><small>Tư vấn & tham quan <b>↗</b></small></button><button class="ux-metric" data-metric="new"><span class="ux-metric-icon">✧</span><span>Hồ sơ mới tiếp nhận</span><strong>${newLeads.length.toLocaleString('vi-VN')}</strong><small>Bắt đầu kết nối phụ huynh <b>↗</b></small></button></div>
      <div class="ux-home-grid"><section class="ux-panel"><div class="ux-panel-heading"><div><h2>Ưu tiên xử lý</h2><p>Thông tin cần biết trước lần liên hệ tiếp theo.</p></div><span class="ux-count">${queue.length} hồ sơ</span></div><div class="ux-queue-tabs" role="tablist" aria-label="Mức độ ưu tiên">${[['urgent','Quá hạn',overdue.length],['today','Hôm nay',today.length],['all','Tất cả',open.length]].map(([k,l,n])=>`<button role="tab" data-queue="${k}" aria-selected="${state.ux.queue===k}" class="${state.ux.queue===k?'active':''}">${l}<span>${n}</span></button>`).join('')}</div><div class="ux-priority-list">${page.map(o=>{const h=householdObj(state,o.householdId),s=studentObj(state,o.studentId),[due,tone]=dueInfo(o);return `<button class="ux-priority-row" data-ux-record="${safe(o.id)}"><span class="ux-person-avatar">${safe(initials(h?.primaryName||'?'))}</span><span class="ux-person"><strong>${safe(h?.primaryName)}</strong><span>${safe(s?.name)} · ${safe(s?.grade)} <b class="ux-school">${safe(o.bu)}</b></span></span><span class="ux-next"><strong>${safe(o.nextAction||'Đặt bước tiếp theo')}</strong><span>${safe(stageName[o.stage]||o.stage)}</span></span><span class="ux-deadline"><span class="ux-pill ${tone}">${due}</span><small>${date(o.dueAt)}</small></span><span class="ux-arrow">↗</span></button>`}).join('')||'<div class="ux-empty"><span>✓</span><h3>Không có hồ sơ trong nhóm này</h3><p>Chọn Tất cả hoặc thay đổi người phụ trách để xem thêm.</p><button class="btn" id="ux-clear-queue">Xem tất cả hồ sơ</button></div>'}</div><div class="ux-list-footer"><span>${queue.length?`${(homePage-1)*6+1}–${Math.min(homePage*6,queue.length)}`:'0'} / ${queue.length} hồ sơ</span><div><button id="ux-prev" class="btn" aria-label="Trang hồ sơ trước" ${homePage===1?'disabled':''}>←</button><span>${homePage} / ${pages}</span><button id="ux-next" class="btn" aria-label="Trang hồ sơ sau" ${homePage===pages?'disabled':''}>→</button></div></div></section>
      <aside class="ux-right-column"><section class="ux-panel" id="ux-appointments"><div class="ux-panel-heading"><div><h2>${appointmentMode==='today'?'Lịch hẹn hôm nay':'Lịch hẹn sắp tới'}</h2><p>Trong phạm vi đang xem</p></div><span class="ux-icon-soft">▦</span></div><div class="ux-appointment-list">${(appointmentMode==='today'?appointmentsToday:appointments.slice(0,3)).map(o=>{const h=householdObj(state,o.householdId);return `<button class="ux-appointment" data-ux-record="${safe(o.id)}"><span class="ux-time">${new Date(o.appointmentAt).toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})}<small>${new Date(o.appointmentAt).toLocaleDateString('vi-VN',{day:'2-digit',month:'2-digit'})}</small></span><span><strong>${safe(h?.primaryName)}</strong><small>${safe(o.appointmentType||'Tư vấn tuyển sinh')}</small><small>${safe(o.appointmentLocation||o.campus||'Chưa có địa điểm')}</small></span></button>`}).join('')||'<div class="ux-empty compact"><p>Không có lịch hẹn trong khoảng đang xem.</p><button class="btn" id="ux-plan">Mở hồ sơ để đặt lịch</button></div>'}</div><button class="ux-text-button" id="ux-calendar-mode">${appointmentMode==='today'?'Xem lịch hẹn sắp tới →':'Xem lịch hẹn hôm nay →'}</button></section>
      <section class="ux-panel ux-pipeline-summary"><div class="ux-panel-heading"><div><h2>Tiến trình tuyển sinh</h2><p>${rows.length} hồ sơ trong phạm vi</p></div></div>${[['Leads','Mới tiếp nhận'],['Marketing Qualified Leads','Đủ điều kiện'],['In Consideration','Đang cân nhắc'],['New Enrollment','Đã nhập học']].map(([key,label])=>{const n=rows.filter(o=>o.stage===key).length;return `<button class="ux-stage-line" data-ux-stage="${key}"><span>${label}<strong>${n}</strong></span><span class="ux-progress"><i style="width:${rows.length?n/rows.length*100:0}%"></i></span></button>`}).join('')}<button class="ux-text-button" id="ux-full-pipeline">Mở bảng giai đoạn <span>→</span></button></section></aside></div>
      <div class="ux-bottom-note"><span class="ux-live-dot"></span> Số liệu lấy từ hồ sơ hiện tại · dữ liệu mẫu lưu trong trình duyệt <button id="ux-open-analysis">Xem phân tích chi tiết →</button></div>`;
    $('#ux-school').onchange=e=>{state.school=e.target.value;homePage=1;save();renderAll()};$('#ux-calendar-mode').onclick=()=>{appointmentMode=appointmentMode==='today'?'upcoming':'today';renderHome()};
    $('#ux-owner').value=state.ux.owner;$('#ux-owner').onchange=e=>{state.ux.owner=e.target.value;homePage=1;save();renderHome()};$('.ux-create',home).onclick=()=>openLeadWizard();
    $$('[data-queue]',home).forEach(b=>b.onclick=()=>{state.ux.queue=b.dataset.queue;homePage=1;renderHome()});
    $('.ux-queue-tabs',home).onkeydown=e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key)||!e.target.dataset.queue)return;e.preventDefault();const items=$$('[data-queue]',home),i=items.indexOf(e.target);const target=items[(i+(e.key==='ArrowRight'?1:2))%3].dataset.queue;state.ux.queue=target;homePage=1;renderHome();$(`[data-queue="${target}"]`,home).focus()};
    $$('[data-ux-record]',home).forEach(b=>b.onclick=()=>openDrawer(b.dataset.uxRecord));
    $$('[data-metric]',home).forEach(b=>b.onclick=()=>{const k=b.dataset.metric;if(k==='urgent'||k==='open'){state.ux.queue=k==='open'?'all':'urgent';homePage=1;renderHome();$('.ux-priority-list',home).scrollIntoView({block:'center',behavior:'smooth'})}else if(k==='appointments'){appointmentMode='today';renderHome();$('#ux-appointments').scrollIntoView({block:'center',behavior:'smooth'})}else goToLeads(k==='new'?'Leads':null)});
    $$('[data-ux-stage]',home).forEach(b=>b.onclick=()=>goToLeads(b.dataset.uxStage));
    $('#ux-prev').onclick=()=>{homePage--;renderHome()};$('#ux-next').onclick=()=>{homePage++;renderHome()};
    $('#ux-clear-queue')?.addEventListener('click',()=>{state.ux.queue='all';$('#searchInput').value='';homePage=1;renderHome()});$('#ux-plan')?.addEventListener('click',()=>goToLeads());
    $('#ux-full-pipeline').onclick=()=>{state.ownerFilter=state.ux.owner;state.stageFilter='All';state.sourceFilter='All';state.qaCampaign='All';state.qaSla='All';state.savedView='all';setAdmissionTab('pipeline');renderAll()};$('#ux-open-analysis').onclick=()=>{homeMode('insights');dashboard.scrollIntoView({block:'start'})};
  }

  // A summary-first profile: the existing four detailed layers remain available.
  const summaryTab=document.createElement('button');summaryTab.dataset.profileLayer='summary';summaryTab.textContent='Tóm tắt';$('.profile-tabs').prepend(summaryTab);summaryTab.onclick=()=>setProfileLayer('summary');
  const summary=document.createElement('section');summary.id='drawer-summary';summary.className='drawer-pane';$('.drawer-scroll').prepend(summary);
  const renderSourceDrawer=renderDrawer;
  renderDrawer=function(){const result=renderSourceDrawer();const o=oppObj(state,state.activeOpp);if(!o)return result;const h=householdObj(state,o.householdId),s=studentObj(state,o.studentId);const tasks=state.tasks.filter(t=>t.oppId===o.id&&t.status!=='Completed').sort((a,b)=>a.dueAt-b.dueAt);const [due,tone]=dueInfo(o);
    summary.innerHTML=`<section class="ux-profile-next"><span class="ux-eyebrow">VIỆC CẦN LÀM TIẾP THEO</span><h3>${safe(o.nextAction||'Đặt lịch liên hệ phụ huynh')}</h3><div><span class="ux-pill ${tone}">${due}</span><span>${date(o.dueAt)}</span></div><p>Phụ trách: <strong>${safe(o.owner)}</strong></p></section><div class="ux-profile-grid"><section class="ux-profile-card"><h3>Phụ huynh</h3><strong>${safe(h?.primaryName)}</strong><p>${safe(h?.phone||'Chưa có số điện thoại')}</p><p>${safe(h?.email||'Chưa có email')}</p><button class="ux-text-button" data-ux-layer="family">Xem gia đình →</button></section><section class="ux-profile-card"><h3>Học sinh</h3><strong>${safe(s?.name)}</strong><p>${safe(s?.grade)} · ${safe(o.bu)}</p><p>${safe(o.program)} · ${safe(o.intake)}</p><button class="ux-text-button" data-ux-layer="student">Xem hồ sơ học sinh →</button></section></div><section class="ux-profile-card"><h3>Nhu cầu & lưu ý</h3><p>${safe(o.parentConcern||'Chưa có ghi chú về nhu cầu phụ huynh. Bổ sung khi tư vấn để lần liên hệ tiếp theo có đầy đủ thông tin.')}</p><div class="ux-profile-status"><span>Giai đoạn hiện tại</span><strong>${safe(stageName[o.stage]||o.stage)}</strong></div><button class="ux-text-button" data-ux-layer="deal">Xem tuyển sinh & tài chính →</button></section><section class="ux-profile-card"><h3>Công việc liên quan <span class="ux-count">${tasks.length}</span></h3>${tasks.slice(0,3).map(t=>`<div class="ux-mini-task"><span class="ux-live-dot"></span><span><strong>${safe(t.name)}</strong><small>${date(t.dueAt)}</small></span></div>`).join('')||'<p>Chưa có công việc đang mở.</p>'}<button class="ux-text-button" data-ux-layer="activity">Xem lịch sử & toàn bộ công việc →</button></section>`;
    $$('[data-ux-layer]',summary).forEach(b=>b.onclick=()=>setProfileLayer(b.dataset.uxLayer));summaryTab.onclick=()=>setProfileLayer('summary');setProfileLayer(state.activeProfileLayer||'summary');return result;
  };
  const sourceOpenDrawer=openDrawer;openDrawer=function(id){state.activeProfileLayer='summary';return sourceOpenDrawer(id)};
  const contact=document.createElement('details');contact.className='ux-contact-menu';contact.innerHTML='<summary>Liên hệ ⌄</summary><div></div>';['drawerCallBtn','drawerZaloBtn','drawerEmailBtn'].forEach(id=>$('div',contact).append($('#'+id)));$('.drawer-actions').append(contact);

  // Long forms are split without remounting fields, so navigating never loses values.
  const steppers=new WeakMap();
  function stepForm(root,host,submit,groups){
    if(!root||!host||!submit)return;
    submit.hidden=false;
    root.querySelector('.ux-form-steps')?.remove();root.querySelector('.ux-form-next')?.remove();
    const fields=$$('.field',host);fields.forEach(f=>f.hidden=false);
    if(!groups){const special=$('.form-section:has(input[type="checkbox"]),.form-section:has(.reason-card)',host);groups=[];if(special)groups.push({title:'Điều kiện & đánh giá',fields:[],special});for(let i=0;i<fields.length;i+=5)groups.push({title:groups.length?'Thông tin bổ sung':'Thông tin chính',fields:fields.slice(i,i+5)});if(groups.length)groups.at(-1).title='Kiểm tra & lưu'}
    if(groups.length<2)return;
    const nav=document.createElement('div');nav.className='ux-form-steps';nav.setAttribute('aria-label','Các bước nhập thông tin');host.before(nav);
    const next=document.createElement('button');next.className='btn primary ux-form-next';next.textContent='Tiếp tục →';submit.before(next);let page=0;
    const specials=groups.map(g=>g.special).filter(Boolean);
    function show(index){page=Math.max(0,Math.min(groups.length-1,index));fields.forEach(f=>f.hidden=!groups[page].fields.includes(f));specials.forEach(s=>s.hidden=s!==groups[page].special);
      nav.innerHTML=`<div class="ux-step-counter">Bước ${page+1} / ${groups.length}<strong>${safe(groups[page].title)}</strong></div><div class="ux-step-track">${groups.map((g,i)=>`<button type="button" data-step="${i}" aria-label="Bước ${i+1}: ${safe(g.title)}" ${i===page?'aria-current="step"':''} class="${i<=page?'done':''}"><span>${i+1}</span>${safe(g.title)}</button>`).join('')}</div>`;
      $$('[data-step]',nav).forEach(b=>b.onclick=()=>show(+b.dataset.step));submit.hidden=page!==groups.length-1;next.hidden=page===groups.length-1;
      const area=host.closest('.modal-body,.stage-form-area');if(area)area.scrollTop=0;
    }
    next.onclick=()=>show(page+1);show(0);steppers.set(root,{show,groups});
  }
  const sourceEditModal=openEditModal;openEditModal=function(){const r=sourceEditModal();const host=$('#editFormBody'),all=$$('.field',host);const take=ids=>all.filter(f=>ids.includes($('input,select,textarea',f)?.id));stepForm($('#editModalOverlay'),host,$('#saveEditBtn'),[{title:'Phụ huynh & học sinh',fields:take(['edParent','edPhone','edEmail','edDistrict','edStudent','edGrade'])},{title:'Nhu cầu tuyển sinh',fields:take(['edBu','edCampus','edProgram','edIntake'])},{title:'Phụ trách & theo dõi',fields:take(['edSource','edCampaign','edOwner','edNext','edDue'])}]);return r};
  $('#editOppBtn').removeEventListener('click',sourceEditModal);$('#editOppBtn').addEventListener('click',()=>openEditModal());
  const editSave=saveEdit;saveEdit=function(){const result=editSave();const invalid=$('[aria-invalid="true"]',$('#editModalOverlay'));if(invalid){const steps=steppers.get($('#editModalOverlay')),index=steps?.groups.findIndex(g=>g.fields.some(f=>f.contains(invalid)));if(index>=0)steps.show(index);invalid.focus()}return result};
  const stageDetails=document.createElement('details');stageDetails.className='ux-stage-choice';stageDetails.innerHTML='<summary>Chọn giai đoạn tiếp theo</summary>';const selector=$('#stageSelector');selector.before(stageDetails);stageDetails.append(selector);
  const sourceStageForm=renderStageForm;renderStageForm=function(){const result=sourceStageForm();const label=stageName[pendingStage]||({'Deposit':'Đặt cọc','Full fee':'Đóng đủ học phí'}[pendingStage])||pendingStage;$('summary',stageDetails).textContent='Giai đoạn: '+label+' · Thay đổi';stepForm($('#stageModalOverlay'),$('#stageDynamicForm'),$('#confirmStageBtn'));return result};
  const sourceStageOpen=openStageModal;openStageModal=function(){const result=sourceStageOpen();stageDetails.open=true;return result};$('#changeStageBtn').onclick=()=>openStageModal();
  selector.addEventListener('click',e=>{if(e.target.closest('[data-stage-target]:not(:disabled)'))stageDetails.open=false});
  // Keep validation messages visible and take users back to missing fields on a previous step.
  const applySourceStage=applyStage;applyStage=function(){const result=applySourceStage();if($('#stageModalOverlay').classList.contains('open')&&$('#stageValidationMessage').textContent){const steps=steppers.get($('#stageModalOverlay'));if(steps){const invalid=$('[aria-invalid="true"]',$('#stageDynamicForm'));const blank=$$('input:not([type=checkbox]):not([type=hidden]),textarea',$('#stageDynamicForm')).find(e=>!e.value.trim());const target=invalid||blank;let i=target?steps.groups.findIndex(g=>g.fields.some(f=>f.contains(target))):0;if(i<0)i=0;steps.show(i);if(target&&!target.closest('[hidden]'))target.focus()}}return result};$('#confirmStageBtn').onclick=()=>applyStage();
  const sourceCampaignOpen=openCampaignModal;openCampaignModal=function(...args){const result=sourceCampaignOpen(...args),root=$('#campaignModalOverlay');stepForm(root,$('.modal-body',root),$('.modal-foot .primary',root));return result};
  const sourceGenericModal=v10OpenModal;v10OpenModal=function(...args){const result=sourceGenericModal(...args);const host=$('#v10ModalBody');if($$('.field',host).length>8)stepForm($('#v10Modal'),host,$('#v10ModalFoot .primary'));return result};
  document.body.dataset.workspaceView=$('.view.active')?.id.replace('view-','')||'dashboard';location.textContent=names[document.body.dataset.workspaceView];homeMode('work');
})();
