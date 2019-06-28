import React, { PureComponent } from "react";

class Animation extends PureComponent {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }
    componentDidMount() {
        this.particle();
    }
    componentDidUpdate() {
        this.particle();
    }

    particle = () => {
        //const { x, y } = this.props; //radius, opacity
        const canvas = this.canvasRef.current;
        const context = canvas.getContext('2d');

        var particleIndex = 0;
        var particles = {};
        var particleNumber = 2;
        /*var prticleSizeW = 5;*/
        /*var particleSizeH = 5;*/

        //Fit Canvas to window
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;

        //handle window resiaze
        initialize();

        function initialize() {
            //Event listener to call the resizeCanvas() function 
            window.addEventListener('resize', resizeCanvas, false);
            // Draw canvas border for the first time.
            resizeCanvas();
        }
        // Resets the canvas dimensions to match window,
        function resizeCanvas() {
            context.canvas.width = window.innerWidth;
            context.canvas.height = window.innerHeight;
        }

        //Clear the canvas
        context.fillStyle = "hsla(0, 0%, 0%, 0)";
        //context.fillRect(0, 0, canvas.width, canvas.height);
        context.clearRect(0, 0, canvas.width, canvas.height);

        //Create a particle object
        function Particle() {
            //Particle attibutes/blueprint
            this.parX = canvas.width * Math.random();
            this.parY = canvas.height * Math.random();

            //Velocity
            this.velX = Math.random() * 20 - 10;
            this.velY = Math.random() * 20 - 10;

            //Gravity effect
            /*this.gravity = 0.3;*/

            //Assign id to each particle
            particleIndex++;
            particles[particleIndex] = this;
            this.id = particleIndex;

            //Particle onscreen lifetime
            this.life = 0;
            this.maxLife = 2;/*Math.random() * 200 - 10;*/

            //Return a Particle object
            return this;
        };
        //draw the particle
        Particle.prototype.draw = function () {
            this.parX += this.velX;
            this.parY += this.velY;
            if (Math.random() < 0.1) {
                this.velX = Math.random() * 10 - 5;
                this.velY = Math.random() * 10 - 5;
            }

            //This is where to play with particle gravity effect
            //this.velX += this.gravity;
            //this.velY += this.gravity;

            //Handle total life for each particle drawn
            this.life++;
            if (this.life >= this.maxLife) {
                delete particles[this.id];
            }

            context.save();
            context.beginPath();

            //Colour Styling of Particles
            context.fillStyle = "hsla(0, 0%, 100%, 0.2)";// "hsl(" + parseInt(Math.random() * 360, 10) + "50%, 50%)";

            //Location to draw Particles and the size of the particle
            context.arc(this.parX, this.parY, Math.random() * (10 - 5) + 1, 0, Math.PI * 2, true);

            //Global transparency added to all particles used when not controlled by hsla
            /*context.globalAlpha = Math.random() * 10 - 5;*/

            context.closePath();
            context.fill();

            //Square Particles
            /*context.fillRect(this.parX, this.parY, prticleSizeW, particleSizeH); prticleSizeW */
        };
        //Controls the speed in miliseconds at which the particles are draw.
        setInterval(() => {
            //globalCompositeOperation https://www.w3schools.com/tags/canvas_globalcompositeoperation.asp
            context.globalCompositeOperation = "source-over";

            for (var i = 0; i < particleNumber; i++) {
                new Particle();
            }
            context.globalCompositeOperation = "lighter";
            for (var x in particles) {
                particles[x].draw();
            }
        }, 150);
    }
    /*onMouseMove={this.props.handleMouseEvent} onMouseOut={this._onMouseOut} 
     * <div className="overlay">THIS IS OVER THE TOP OF THE CANVAS</div>*/
    render() {
        const { children } = this.props;
        return (
            <div className="canvasContainer">
                <canvas ref={this.canvasRef} id="canvas">{children}</canvas>
            </div>
        );
    }
}

export default Animation;