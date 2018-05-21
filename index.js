document.addEventListener("DOMContentLoaded", function(event) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const canvas = document.getElementById('canvas');
  canvas.width = w;
  canvas.height = h;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, w, h);

  const clear = () => context.clearRect(0,0,w,h);
  const tenMovingBands = renderMovingBands(10);
  const strober = withStrobe(() => renderBands(2*h,'#10beef',true));

  function draw() {
    setTimeout(function() {
      requestAnimationFrame(draw);
      clear();
      renderBands(12);
    }, 0);
  }

  draw();

  function renderBands(n, alternate = false){
    const bandH = h / n;
    for(let i = 0; i < h; i+=bandH){
      const color = getRandomColor();

      if(alternate && Math.floor(i/bandH) % 2 !== 0)
      continue;

      renderRows(i, i+bandH, color);
    }
  }

  function withStrobe(renderer){
    let toggle = true;
    return function(){
      if(toggle){
        renderer();
      }
      toggle = !toggle;
    }
  }

  function renderMovingBands(n){
    let start = 0;
    const bandH = h / n;
    let tailStart = start - (2 * bandH);
    return function (color){
      const end = start + bandH;
      const tailEnd = tailStart + bandH;
      if(tailStart >= 0) {
        renderRows(tailStart, tailEnd, color);
      }
      renderRows(start, end, color);
      start = start > h ? 0 : start + bandH;
      tailStart = tailStart > h ? 0: start - (2 * bandH);
    }
  }

  function renderRows(start, end, color){
    for(let i = start; i < end; i++){
      renderRow(i, color);
    }
  }

  function renderAll(color){
    context.clearRect(0,0,w,h);
    for(let i = 0; i < (w * h) + 1; ++i){
      renderPixel(i, color)
    }
  }

  function renderRow(index, color){
    const start = index * w;
    const end = start + w - 1;
    for(let i = start; i < end; i ++){
      renderPixel(i, color);
    }
  }

  function renderPixel(i, color){
    context.fillStyle = color || getRandomColor();
    context.fillRect(i % w, Math.floor(i / w), w/h, w/h);
  }

  function getRandomColor() {
    var letters = '123456789ABCDE';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});
