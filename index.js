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

const dep1 = cf.Metric('first_pump_arriving_attendance_time', 'percentiles')
const firstArrivalMins = {
    name: 'first_arrival_mins',
    label: 'First Arrival (mins)',
    type: 'NUMBER',
    dependencies: [dep1],
    function: (seconds) => seconds / 60
}

cf.setProviders([
    {
        name: 'My data engine',
        provider: 'elasticsearch',
        url: 'http://localhost:9200',
        metadata: {
            london_fire_brigade_calls_test: {
                count: {
                    label: 'Calls'
                },
                fields: {
                    borough_code: {
                        label: 'Borough Code',
                        type: 'ATTRIBUTE'
                    },
                    borough_name: {
                        label: 'Borough',
                        type: 'ATTRIBUTE'
                    },
                    property_category: {
                        label: 'Property Category'
                    },
                    hour_of_call: {
                        label: 'Hour of Call'
                    },
                    first_arrival_mins: firstArrivalMins
                }
            }
        }
    }
])

// ============== VISUALIZATION FUNCTIONS ===================

function interactionManager() {
    /* Configuration code for the Interaction Manager*/

    let rules = { 'bars-vertical': { clientFilters: true } }

    // Define options
    let aktive = cf.create()
    let myChart = aktive
        .graph('Interaction Manager')
        .set('rules', rules)
        .set('skin', 'modern')
        .element('imanager')
        .execute()
}

function trend() {
/* Configuration code for this widget */
let provider = cf.provider("My data engine");
let source = provider.source('london_fire_brigade_calls_test');
// Define metrics
let metric0 = cf.Metric("count");
// Define attributes to group by
let group1 = cf.Attribute("borough_name")
	.limit(10)
	.sort("desc", cf.Metric());
// Add metrics and groups to data source
let myData = source.groupby(group1)
	.metrics(metric0);
// --- Define chart options and static filters ---
// Define Color Palette
let color = cf.Color()
	.palette(["#332288", "#6699cc", "#88ccee",
		"#44aa99", "#117733", "#999933",
		"#ddcc77", "#661100", "#cc6677",
		"#aa4466", "#882255", "#aa4499"]);
let myChart = myData.graph("Tree Map")
	.set("color", color)
    .element("trend")
	.execute();

}

function verticalbars() {
    /* Configuration code for this widget */
    let provider = cf.provider('My data engine')
    let source = provider.source('london_fire_brigade_calls_test')
    // Define metrics
    let metric0 = cf.Metric('count')
    // Define attributes to group by
    let group1 = cf
        .Attribute('hour_of_call')
        .limit(24)
        .sort('asc', 'hour_of_call')
    // Add metrics and groups to data source
    let myData = source.groupby(group1).metrics(metric0)
    // --- Define chart options and static filters ---
    // Define Grid
    let grid = cf.Grid().top(10).right(15).bottom(35).left(65)
    // Define Color Palette
    let color = cf.Color().palette(['#0095b7', '#005b76'])
    let myChart = myData
        .graph('Bars')
        .set('grid', grid)
        .set('color', color)
        .set('dataZoom', false)
        .set('serieLabel', {
            show: true,
            position: 'insideBottom'
        })
        .element('bars-vertical')
        .execute()
}

function boxplot() {
    /* Configuration code for this widget */
    let provider = cf.provider('My data engine')
    let source = provider.source('london_fire_brigade_calls_test')
    //Configuration for grid
    let grid = cf.Grid().left(45).right(25).bottom(35).top(35)
    // Define metrics
    let metric0 = cf.Metric('first_arrival_mins')
    // Define attributes to group by
    let group1 = cf.Attribute('borough_name').limit(24).sort('desc', metric0)
    // Add metrics and groups to data source
    let myData = source.groupby(group1).metrics(metric0)
    // --- Define chart options and static filters ---
    let myChart = myData
        .graph('Box Plot')
        .set('grid', grid)
        .set('xAxis', { labelGap: 30 })
        .set('orientation', 'horizontal')
        .element('box-plot')
        .execute()
}

function horizontalbars() {
    /* Configuration code for this widget */
    let provider = cf.provider('My data engine')
    let source = provider.source('london_fire_brigade_calls_test')
    // Define metrics
    let metric0 = cf.Metric('count')
    let metricColor = cf.Metric('count')
    // Define attributes to group by
    let group1 = cf
        .Attribute('borough_name')
        .limit(24)
        .sort('desc', cf.Metric())
    // Add metrics and groups to data source
    let myData = source.groupby(group1).metrics(metric0)
    // --- Define chart options and static filters ---
    // Define Grid
    let grid = cf.Grid().top(10).right(15).bottom(35).left(65)
    // Define Color Palette
    let color = cf.Color().palette(['#d95f0e', '#fff7bc']).metric(metricColor)
    let myChart = myData
        .graph('Bars')
        .set('grid', grid)
        .set('color', color)
        .set('orientation', 'horizontal')
        .set('xAxis', { show: true, lines: true })
        .set('yAxis', { text: 'out' })
        .set('dataZoom', false)
        .set('serieLabel', {
            show: true,
            position: 'insideLeft'
        })
        .element('bars-horizontal')
        .execute()
}

function vectormap() {
    /* Configuration code for this widget */
    let provider = cf.provider('My data engine')
    let source = provider.source('london_fire_brigade_calls_test')
    // Define metrics
    let metric0 = cf.Metric('count')
    // Define attributes to group by
    let group1 = cf.Attribute('proper_case').limit(100).sort('desc', metric0)

    // Add metrics and groups to data source
    let myData = source.groupby(group1).metrics(metric0)
    // --- Define chart options and static filters ---
    let color = cf.Color().metric(metric0)
    color.autoRange({ dynamic: true })
    let myChart = myData
        .graph('Vector Map')
        .set('shape', 'https://chartfactor.com/resources/london.json')
        .set('min', 0)
        .set('zoom', 0.5200000000000038)
        .set('center', [-0.0865686641276791, 51.489486857517825])
        .set('color', color)
        .set('legend', 'right')
        .set('enableZoom', false)
        .element('vector-map')
        .execute()
}

function timeslider() {
    /* Configuration code for this widget */
    let provider = cf.provider('My data engine')
    let source = provider.source('london_fire_brigade_calls_test')
    let grid = cf.Grid().right(20).left(10)
    // Define the time field to be used
    let field = cf.Attribute('date_of_call').func('DAY')
    let myData = source.timeField(field)
    // --- Define chart options and static filters ---
    let myChart = myData
        .graph('Time Slider')
        .set('grid', grid)
        .set('player', {
            enable: true,
            'pin-left': false,
            step: 1,
            'step-unit': 'DAY',
            refresh: 1,
            'animation-delay': 0.4,
            live: false,
            autoplay: false
        })
        .element('time-slider')
        .execute()
}

function slicer() {
    /* Configuration code for this widget */
    let provider = cf.provider('My data engine')
    let source = provider.source('london_fire_brigade_calls_test')
    // Define metrics
    let metric0 = cf.Metric('count')
    // Define attributes to group by
    let group1 = cf
        .Attribute('property_category')
        .limit(100)
        .sort('desc', cf.Metric())

    // Add metrics and groups to data source
    let myData = source.groupby(group1).metrics(metric0)
    // --- Define chart options and static filters ---
    let myChart = myData.graph('Slicer').element('slicer').execute()
}

function rdt() {
    /* Configuration code for this widget */
    let provider = cf.provider('My data engine')
    let source = provider.source('london_fire_brigade_calls_test')
    let myData = source.fields()
    // --- Define chart options and static filters ---
    let myChart = myData
        .graph('Raw Data Table')
        .set('showRowNumber', false)
        .set('autoSizeColumns', true)
        .element('rdt')
        .execute()
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
