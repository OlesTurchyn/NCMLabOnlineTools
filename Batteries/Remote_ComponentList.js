var ComponentList = []

ComponentList.push({name:'Stroop Color', iconFileName:'StroopColor.png'})
ComponentList.push({name:'Stroop Word', iconFileName:'StroopWord.png'})
ComponentList.push({name:'Stroop Color/Word', iconFileName:'StroopColorWord.png'})
ComponentList.push({name:'Trail Making', iconFileName:'TrailMakingA.png'})
ComponentList.push({name:'RAVLT', iconFileName:'RAVLT.png'})
ComponentList.push({name:'ICAR Matrix Reasoning', iconFileName:'ICARMatrixReasoning.png'})
ComponentList.push({name:'Cube Copy', iconFileName:'CubeCopy.png'})
ComponentList.push({name:'Likert', iconFileName:'Likert.png'})
ComponentList.push({name:'MultipleChoice', iconFileName:'MultiChoice.png'})
ComponentList.push({name:'DigitSpan', iconFileName:'MultiChoice.png'})
// What battery was passed?

// I think I can use the name instead of the index
add('Stroop Color', function(){jatos.startComponent(5)});
add('Stroop Word', function(){jatos.startComponent(6)});
add('Stroop Color/Word', function(){jatos.startComponent(7)});
add('Trail Making', function(){jatos.startComponent(21)});
add('RAVLT', function(){jatos.startComponent(10)});
add('ICAR Matrix Reasoning', function(){jatos.startComponent(16)});
add('Cube Copy', function(){jatos.startComponent(15)});
add('Likert',function(){jatos.startComponent(19)});
add('Digit Span',function(){jatos.startComponent(20)});

const BatteryHtmlID = 1


var BatteryList = []
// This is not used yet
var BatteryDescription = 'This is a description of the battery of tests that will be taken.'

BatteryList.push({index: 1, 
	name:'Battery001', 
	list: ['Digit Span','Cube Copy','Stroop Color','Stroop Word','Stroop Color/Word','Trail Making','RAVLT'], 
	description: BatteryDescription,
	ParameterLists: ['DigitSpan_Visual_Forward_Fixed01_Load05','CubeCopy_Default','Stroop_Default',
		'Stroop_Default',
		'Stroop_001',
		'TrailMakingA_Default',
		'RAVLT_Default'
		]})

BatteryList.push({index: 2, 
	name:'Battery002', 
	list: ['Stroop Word','Stroop Word'], 
	description: BatteryDescription,
	ParameterLists: ['Stroop_Default','Stroop_Default']})

BatteryList.push({index: 3, 
	name:'List of Questionnaires', 
	list: ['Likert','Likert','Likert','Likert'], 
	description: BatteryDescription,
	ParameterLists: ['panas','cfi','cfs','stai']})

