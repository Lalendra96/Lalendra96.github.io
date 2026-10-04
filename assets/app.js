const body=document.body;
const theme=document.getElementById('theme');
const savedTheme=localStorage.getItem('portfolio-theme');
if(savedTheme==='light'||(!savedTheme&&window.matchMedia('(prefers-color-scheme: light)').matches)){body.classList.add('light')}
theme?.addEventListener('click',()=>{body.classList.toggle('light');localStorage.setItem('portfolio-theme',body.classList.contains('light')?'light':'dark')});
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();

const repos=[
['blood-bank-module','Healthcare · Transfusion Medicine','private'],
['cadre-system','Workforce Management','public'],
['Car-Pass-Web-Application-NHK','Web Application','private'],
['carPassNHK','Web Application','private'],
['diet-management-apache','Hospital Operations','private'],
['donor-registration-module','Healthcare · Donor Registration','private'],
['explain-it-simply','Developer Tool','public'],
['fhir-validator','Healthcare Interoperability','public'],
['health-secuirty-scanner','Healthcare Cybersecurity','public'],
['hospital-diet-management-system','Hospital Operations','private'],
['hospital-theme','Healthcare UI','private'],
['hospital-theme-website','Healthcare UI','private'],
['InternalManagementSystem','Enterprise Management','private'],
['internal_resource_mgmt','Resource Management','private'],
['inventory-and-server-montioring-system','Infrastructure · Asset & Server Monitoring','public'],
['Lalendra96.github.io','Portfolio','public'],
['lansu-tender-document-builder','Government Procurement','private'],
['Letter-Management','Document Management','private'],
['lims','Healthcare · Laboratory','private'],
['material-dashboard-laravel','Laravel · UI','public'],
['msd-donations','Donation Management','public'],
['polaris-app','Application','public'],
['rdmp','Research Data Management','private'],
['THPOPD','Healthcare · OPD','private'],
['tuition-mgmt-system','Education Management','private']
];

const repoList=document.getElementById('repo-list');
const repoCount=document.getElementById('repo-count');
if(repoList){
  repoList.innerHTML=repos.map(([name,domain,visibility],index)=>{
    const inner=`<span class="repo-num">${String(index+1).padStart(2,'0')}</span><span class="repo-name">${name}</span><span class="repo-domain">${domain}</span><span class="repo-visibility">${visibility.toUpperCase()}</span>`;
    return visibility==='public'
      ? `<a class="repo-row public" data-visibility="public" href="https://github.com/Lalendra96/${name}" target="_blank" rel="noopener">${inner}</a>`
      : `<div class="repo-row private" data-visibility="private" title="Private repository">${inner}</div>`;
  }).join('');
}
document.querySelectorAll('.repo-filter').forEach(button=>{
  button.addEventListener('click',()=>{
    document.querySelectorAll('.repo-filter').forEach(b=>b.classList.remove('active'));
    button.classList.add('active');
    const filter=button.dataset.filter;
    let visible=0;
    document.querySelectorAll('.repo-row').forEach(row=>{
      const show=filter==='all'||row.dataset.visibility===filter;
      row.hidden=!show;if(show)visible++;
    });
    if(repoCount)repoCount.textContent=`${visible} ${visible===1?'repository':'repositories'}`;
  });
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
  });
},{threshold:.08,rootMargin:'0px 0px -45px'});
document.querySelectorAll('.reveal').forEach((el,index)=>{
  el.style.transitionDelay=`${Math.min((index%4)*55,165)}ms`;
  observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',()=>document.activeElement?.blur());
});