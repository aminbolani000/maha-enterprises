/* ==========================================================================
   MAHA ENTERPRISES - GLASS LIGHT PINK LIQUID FLUID (liquid_animation.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const canvas = document.getElementById('liquid-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Vibrant Orange Glass Shadow Color Palette
const pinkLiquid = { r: 255, g: 120, b: 0 }; // Bright Orange

    // Interactive Points for Ripple Effect
    let points = [];
    const maxPoints = 30;

    const mouse = {
        x: width / 2,
        y: height / 2,
        targetX: width / 2,
        targetY: height / 2,
        radius: 200
    };

    // Scroll Effect Acceleration
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        scrollVelocity = Math.abs(currentScroll - lastScrollY) * 0.15;
        lastScrollY = currentScroll;

        // Add fluid wave point on scroll
        addPoint(width / 2 + (Math.random() - 0.5) * 400, height / 2 + (Math.random() - 0.5) * 200, scrollVelocity * 10);
    });

    // Touch & Mouse Movement
    function handlePointerMove(e) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        mouse.targetX = clientX;
        mouse.targetY = clientY;

        addPoint(clientX, clientY, 15);
    }

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Touch / Click Pulse
    function handlePointerDown(e) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        for (let i = 0; i < 5; i++) {
            addPoint(
                clientX + (Math.random() - 0.5) * 50,
                clientY + (Math.random() - 0.5) * 50,
                40
            );
        }
    }

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('touchstart', handlePointerDown, { passive: true });

    function addPoint(x, y, radius) {
        points.push({
            x: x,
            y: y,
            radius: radius || 20,
            maxRadius: (radius || 20) + 120,
            alpha: 0.35,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2
        });

        if (points.length > maxPoints) {
            points.shift();
        }
    }

    // Render Loop for Liquid Glass Effect
    function render() {
        ctx.clearRect(0, 0, width, height);

        // Smooth Mouse Inertia with GSAP-like ease
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;

        // Render Cursor Ambient Glass Glow
        const mouseGlow = ctx.createRadialGradient(
            mouse.x, mouse.y, 0,
            mouse.x, mouse.y, mouse.radius + scrollVelocity * 5
        );
        mouseGlow.addColorStop(0, `rgba(${pinkLiquid.r}, ${pinkLiquid.g}, ${pinkLiquid.b}, 0.22)`);
        mouseGlow.addColorStop(0.5, `rgba(${pinkLiquid.r}, 192, 203, 0.08)`);
        mouseGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.fillStyle = mouseGlow;
        ctx.arc(mouse.x, mouse.y, mouse.radius + scrollVelocity * 5, 0, Math.PI * 2);
        ctx.fill();

        // Render Dynamic Liquid Wave Blobs
        for (let i = points.length - 1; i >= 0; i--) {
            const p = points[i];

            p.x += p.vx;
            p.y += p.vy;
            p.radius += (p.maxRadius - p.radius) * 0.05;
            p.alpha *= 0.96; // Smooth fade

            if (p.alpha < 0.01) {
                points.splice(i, 1);
                continue;
            }

            const blobGradient = ctx.createRadialGradient(
                p.x, p.y, 0,
                p.x, p.y, p.radius
            );

            // Light Pink Glass Shadow Color Gradient
            blobGradient.addColorStop(0, `rgba(${pinkLiquid.r}, 192, 203, ${p.alpha})`);
            blobGradient.addColorStop(0.6, `rgba(255, 228, 225, ${p.alpha * 0.5})`);
            blobGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.beginPath();
            ctx.fillStyle = blobGradient;
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // Decay scroll velocity
        scrollVelocity *= 0.9;

        requestAnimationFrame(render);
    }

    render();

    // Resize Handler
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }, { passive: true });
});