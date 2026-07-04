
(function(){
  var blocks=document.querySelectorAll(".elementor-element-ded7b41");
  if(!blocks.length||!("IntersectionObserver" in window))return;
  for(var i=0;i<blocks.length;i++){blocks[i].classList.add("ss-reveal");}
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("ss-in"); io.unobserve(e.target); } });
  },{threshold:0.12,rootMargin:"0px 0px -8% 0px"});
  for(var j=0;j<blocks.length;j++){io.observe(blocks[j]);}
})();
