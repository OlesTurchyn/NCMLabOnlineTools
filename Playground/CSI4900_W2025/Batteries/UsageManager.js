var timeline = []
var enter_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: FullScreenMode
}
// List of the names of the different tasks
var TaskNameList = []
var TaskIconList = []
var ComponentIDList = []
var ComponentParameterLists = []
var DisplayBatteryInstructionsFlag
var BatteryInstructions
var TaskList = []
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

var trial0 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "",
    choices: "",
    trial_duration: 10
    
}

var SetupBattery = {
    type: jsPsychCallFunction,
    func: function() {
        console.log(ComponentList)

        console.log(jatos)
        console.log(jatos.workerId)
        

        var all_data = jsPsych.data.get();
        console.log(all_data)
        CurrentBattery = BatteryList.find(x => x.index === parseInt(all_data.trials[0].Battery))
        // read the data for this trial
        console.log(CurrentBattery)
        // find the battery selected and extract its list of components
        let ParameterList = CurrentBattery.TaskList.map(({ Parameters }) => Parameters)
        let TaskList = CurrentBattery.TaskList.map(({ Task }) => Task)
        let TaskIconList = CurrentBattery.TaskList.map(({ IconName }) => IconName)
        let InstructionList = CurrentBattery.TaskList.map(({ Instructions }) => Instructions)

        var Language = CurrentBattery.Language
        
        // Extract the battery instructions
        BatteryInstructions = CurrentBattery.BatteryInstructions
        console.log(BatteryInstructions)
        FooterText = CurrentBattery.Footer

        // Check the session data to see if it is empty, if so add to it. If not, leave it alone
                // Is this worker in the Batch data?
        JATOSSessionData = jatos.studySessionData

        if ( isEmpty(JATOSSessionData) && ( typeof jatos.batchSession.get(jatos.workerId) == 'undefined' )) 
        {
            console.log("FIRST TIME")
            jatos.batchSession.set(jatos.workerId, 0);
            // Add things to the jatos session data
            TaskCompleted = Array(TaskList.length).fill(0)
            console.log(TaskCompleted)
            JATOSSessionData = {CurrentIndex: 0, TaskNameList:TaskList, ComponentParameterLists:ParameterList, InstructionList:InstructionList, TaskIconList: TaskIconList} 
            // add the ID to return to the JATOS battery
            JATOSSessionData.Language = Language
            JATOSSessionData.TaskCompleted = TaskCompleted
            JATOSSessionData.FooterText = FooterText
            JATOSSessionData.BatteryName = CurrentBattery.name
            JATOSSessionData.BatteryScore = -99
            // If this is the first visit to this manager, display the battery instructions
            DisplayBatteryInstructionsFlag = true 
        }
        else if ( isEmpty(JATOSSessionData) && ( typeof jatos.batchSession.get(jatos.workerId) != 'undefined' )) 
        { // This is a restart, remake the session data
            // Add things to the jatos session data
            console.log("RESTART the BROSWER")
            var currentIndex = jatos.batchSession.get(jatos.workerId)
            JATOSSessionData = {CurrentIndex: currentIndex, TaskNameList:TaskList, ComponentParameterLists:ParameterList, InstructionList:InstructionList, TaskIconList: TaskIconList} 
            // add the ID to return to the JATOS battery
            JATOSSessionData.Language = Language
            TaskCompleted = Array(TaskList.length).fill(0)
            JATOSSessionData.TaskCompleted = TaskCompleted
            JATOSSessionData.FooterText = FooterText
            JATOSSessionData.BatteryName = CurrentBattery.name
            JATOSSessionData.BatteryScore = -99
            // If this is the first visit to this manager, display the battery instructions
            DisplayBatteryInstructionsFlag = true         }
        else 
        {
            console.log('Continuing the SESSION')
            DisplayBatteryInstructionsFlag = false
        }
        
        jatos.studySessionData = JATOSSessionData
        //console.log(jatos.batchSession.getAll())
        //console.log(jatos)
        //console.log(DDDD)
        
    }
}
// http://127.0.0.1:9000/publix/uh1blCUqev2?Battery=7

var if_node_ALaCarte = {
    type: jsPsychCallFunction,
    func: function() {    
        data = jsPsych.data.get()
        console.log(data.trials[0].Battery)
        if (Number(data.trials[0].Battery) > 1000 ) {
            JATOSSessionData.UsageType = 'ALaCarte'
            jatos.studySessionData = JATOSSessionData
            jatos.startComponentByTitle("User Choice")
        }
    }
}

var if_node_Battery = {
    type: jsPsychCallFunction,
    func: function() {    
        data = jsPsych.data.get()
        console.log(data.trials[0])
        
        if (Number(data.trials[0].Battery) < 1000 ) {
            JATOSSessionData.UsageType = 'Battery'
            jatos.studySessionData = JATOSSessionData
           jatos.startComponentByTitle("Batteries")
        }
    }
}

var if_node_SingleTask = {
    type: jsPsychCallFunction,
    func: function() {    
        data = jsPsych.data.get()
        
        if (jatos.urlQueryParameters.TaskIndex != null ) 
        {
            JATOSSessionData.UsageType = 'SingleTask'
            jatos.studySessionData = JATOSSessionData
            jatos.startComponentByTitle("Run Single Task")
        }
    }
}

var if_node_SessionChooser = {
    type: jsPsychCallFunction,
    func: function() {    
        data = jsPsych.data.get()
        
        if (jatos.urlQueryParameters.Session != null ) 
        {
            JATOSSessionData.UsageType = 'SessionChooser'
            jatos.studySessionData = JATOSSessionData
            jatos.startComponentByTitle("Session Chooser")
        }
    }
}

//timeline.push(enter_fullscreen)
timeline.push(trial0)

timeline.push(SetupBattery)
timeline.push(if_node_SessionChooser)
timeline.push(if_node_SingleTask)
timeline.push(if_node_ALaCarte)
timeline.push(if_node_SessionChooser)

timeline.push(if_node_Battery)