
console.log(converter.makeHtml("###JASON 1. One 2. Two 3. Three"))

var title = "UCLA 3-item Loneliness Scale"
var shortTitle = ""
const survey_JSON = {
  showQuestionNumbers: "off",
  showCompletedPage: false,
  
  pages: [{
    
    elements: [                
      {
        type: "html",
        name: "introduction",
        html: "<p style=\"text-align: justify;\">"+
        "When answering the questions, you could take account of the following:"+
        "<ul><li>There are no right or wrong answers</li>"+
        "<li>We would like you to be completely honest</li>"+
        "<li>In answering the questions it is best to think of your life as it generally is now (we all have some good or bad days)</li>"+
        "</b></p>"
       },
        {
          type: "radiogroup",
          name: "loneliness001",
          title: "How often do you feel that you lack companionship?",
          isRequired: true,
          showNoneItem: false,
          showOtherItem: false,
          colCount: 1,
          choices: [ "Hardly ever", "Some of the time", "Often" ],
          separateSpecialChoices: true,
          showClearButton: true
        },
        {
          type: "radiogroup",
          name: "loneliness002",
          title: "How often do you feel left out?",
          isRequired: true,
          showNoneItem: false,
          showOtherItem: false,
          colCount: 1,
          choices: [ "Hardly ever", "Some of the time", "Often" ],
          separateSpecialChoices: true,
          showClearButton: true
        },
        {
          type: "radiogroup",
          name: "loneliness003",
          title: "How often do you feel isolated from others?",
          isRequired: true,
          showNoneItem: false,
          showOtherItem: false,
          colCount: 1,
          choices: [ "Hardly ever", "Some of the time", "Often" ],
          separateSpecialChoices: true,
          showClearButton: true
        },
      ],
    }]
  };


var EN_UCLAlonelinessJSON = {}
EN_UCLAlonelinessJSON.title = "Which is the brand of your car?",
EN_UCLAlonelinessJSON.shortTitle = "car"
EN_UCLAlonelinessJSON.survey_JSON = survey_JSON
EN_UCLAlonelinessJSON.description = "DESCR"
EN_UCLAlonelinessJSON.QuestionnaireType = 'likert'
EN_UCLAlonelinessJSON.references = "references"
EN_UCLAlonelinessJSON.notes = ''

