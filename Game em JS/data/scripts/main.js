import Player from './player.js';
import InputHandler from './input.js';
import { drawStatusText } from './utils.js';

window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    loading.style.display = 'none';
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    const player = new Player(canvas.width, canvas.height);
    const input = new InputHandler();

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.update(input.lastKey);
        player.draw(ctx);
        drawStatusText(ctx, input, player);
        requestAnimationFrame(animate);
        
    }
    animate();
});
