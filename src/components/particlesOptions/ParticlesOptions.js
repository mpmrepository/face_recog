
const ParticlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      },
    },
    opacity: {
      value: 1,
      random: false,
      anim: {
        enable: false
      }
    }, 
    color: {
      value: '#000000'
    },  
    size: {
      value: 3,
      random: true

    },  
    line_linked: {
      enable: false,
    }
  }
}

export default ParticlesOptions;