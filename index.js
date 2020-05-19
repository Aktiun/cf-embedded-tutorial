// ----- Animations and actions
const $ = cf.getDependency('jquery')

$('body').click((event) => {
    if ($(event.target).attr('id') !== 'categories-btn') {
        $('#slicer-container').removeClass('open')
    }

    if ($(event.target).attr('id') !== 'rdt-btn') {
        $('#rdt-container').removeClass('open')
    }
})

$('#rdt-container').click((event) => event.stopPropagation())
$('#slicer-container').click((event) => event.stopPropagation())
$('#categories-btn').click(() => {
    $('#slicer-container').addClass('open')
})
$('#rdt-btn').click(() => {
    $('#rdt-container').addClass('open')
})

// ============== PROVIDER CONFIGURATION ===================
//


// ============== VISUALIZATION FUNCTIONS ===================

function interactionManager() {
}

function trend() {
}

function verticalbars() {
}

function boxplot() {
}

function horizontalbars() {
}

function vectormap() {
}

function timeslider() {
}

function slicer() {
}

function rdt() {
}

slicer()
rdt()
timeslider()
trend()
verticalbars()
horizontalbars()
boxplot()
interactionManager()
vectormap()
