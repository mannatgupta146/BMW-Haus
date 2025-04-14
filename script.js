const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim() {
    var tl = gsap.timeline();
  
    tl.from("#nav", {
      y: "-10",
      opacity: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
    })
      .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: 0.2,
      })
      .from("#homefooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut,
      });
  }

var timeout;  

function mouseShapeChange(){
  //define default value
  var xscale = 1;
  var yscale = 1; 

  var xprev = 0;
  var yprev = 0;

  window.addEventListener('mousemove', function(dets){
    clearTimeout(timeout);

    var xdiff = dets.clientX - xprev;
    var ydiff = dets.clientY - yprev;

    xscale = gsap.utils.clamp(.8, 1.2, xdiff);
    yscale = gsap.utils.clamp(.8, 1.2, ydiff);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function(){
      document.querySelector('#circlepointer').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`; 
    }, 100)

  })
}

function circleMouseFollower(xscale, yscale){
    window.addEventListener('mousemove', function(dets){
        document.querySelector('#circlepointer').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
})
}

circleMouseFollower();
firstPageAnim();
mouseShapeChange();

document.querySelectorAll(".element").forEach(function (element) {
  var rotate = 0;
  var diffrot = 0;

  element.addEventListener("mouseleave", function (dets) {
    gsap.to(element.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  element.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - element.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(element.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});