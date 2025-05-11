document.addEventListener('DOMContentLoaded', function() {
    crearGaleria()
    navegacionFija()
    resaltarEnlace()
    scrollNav()
})
    
function navegacionFija() {
    const header = document.querySelector('.header')
    const sobreFestival = document.querySelector('.sobre-festival')

    window.addEventListener('scroll', function() {
        if(sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
        }
    })

}

function crearGaleria () {
    
    const CANTIDAD_IMAGENES = 16
    const galeria = document.querySelector('.galeria-imagenes')

    for (let i=1; i<=CANTIDAD_IMAGENES; i++){
        const imagen = document.createElement('IMG')
        imagen.src = `src/img/gallery/full/${i}.jpg`
        imagen.alt = 'Imagen galeria'
     
        //Event Handler
        imagen.onclick = function() {
            mostrar_imagen(i)
        }

        galeria.appendChild(imagen)
    }
}


function mostrar_imagen(i) {

    //Generar Modal
    const modal= document.createElement('DIV')
    modal.classList.add('modal')
    
    //Event Handler
    modal.onclick = cerrar_modal
    
    //Agregar Imagen
    const imagen = document.createElement('IMG')
    imagen.src = `src/img/gallery/full/${i}.jpg`
    imagen.alt = 'Imagen galeria'
    modal.appendChild(imagen)

    //Agregar 'Boton'

    const botonX = document.createElement('P')
    botonX.textContent = 'X'
    modal.appendChild(botonX)
    
    //Agregar Modal
    const body = document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.appendChild(modal)


}

function cerrar_modal() {
    const modal = document.querySelector('.modal')
    modal?.classList.add('fadeOut')
    setTimeout(() => {
        modal?.remove()
        const body = document.querySelector('body')
        body.classList.remove('overflow-hidden')
    }, 500);  
}

function resaltarEnlace() {
    document.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.nav-principal a')

        let actual =''

        sections.forEach ( section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight

            if (window.scrollY >= (sectionTop-sectionHeight/3)) {
                actual = section.id
            }
        })

        navLinks.forEach( link => {
            if(link.getAttribute('href') === '#' + actual) {
                link.classList.add('active')
            } else {
                if(link.classList.contains('active')){
                    link.classList.remove('active')
                }
            }
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.nav-principal a')

    navLinks.forEach ( link => {
        link.addEventListener ('click', e=>{
            e.preventDefault()
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({behavior : 'smooth'})
        })
    })
}