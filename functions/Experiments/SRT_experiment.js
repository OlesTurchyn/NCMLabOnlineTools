
// What is needed?
/*
- Ask participant to read a practice list of words to make sure they can be recognized by 
the computer.
- If words can not be identified decide to skip this experiment. 
- Calculate all of the scores.
- Present words a set number of time and modify the word list each time

*/

// =======================================================================
// Define internal variables
var timeline = [];
var ind = 0;
var interval
var time_left
console.log(WordList)
SimpleWordList = CreateSimpleWordList(WordList)
// create list of audio files from this list
AudioFileList = CreateAudioFileList(FolderName, SimpleWordList, FileExtension)
console.log(AudioFileList)
AltSimpleWordList = CreateSimpleWordList(AlternatePronunciationsWordList)
// Create the full list of primary and alternative pronunciations to search 
FullWordList = SimpleWordList.concat(AltSimpleWordList)
// indices fro teh primary word list
WordListIndex = CreateWordListIndex(WordList)
// indices for the world list containing the alternatives
FullListIndex = CreateSimpleIndexList(WordList, AlternatePronunciationsWordList)
console.log(FullListIndex)
// =======================================================================
var enter_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true
}

// preload audio
var preload_audio = {
  type: jsPsychPreload,
  audio: AudioFileList,
};

var preload_silence = {
  type: jsPsychPreload,
  audio: FolderName + 'Silence' + '.wav',
};


// =======================================================================
// Define all of the different the stimuli 
var fixation = {
  type: jsPsychHtmlButtonResponseTouchscreen,
  stimulus: '<p class="Fixation">+</p>',
  choices: [],
  post_trial_gap: 0,
  margin_horizontal: GapBetweenButtons,
  prompt: '',
  trial_duration: function() {
      // if this word was recalled previously change the duration to 0 seconds also
      if (WordListIndex[ind] > -99) {
        return FixationTimeBetweenWords
      }
      else {
        return 0
      }
    },
}
// Define the stimuli


var PresentSelectiveWords_Audio = {
    type: jsPsychAudioKeyboardResponse,
    stimulus: function()
      {
        Stim = ''
        // find what trial index this is
        ind = (TrialCount) % NWords
        // check to see if this trial was recalled in the previous block
        if (WordListIndex[ind] > -99) {
          // if NOT, then present the word
          Stim = AudioFileList[ind]
        }
        else {
          Stim = FolderName + 'Silence' + '.wav'
        }
        // return the chosen stimulus
        console.log(Stim)        
        return Stim
      },
    choices: [],  
    trial_duration: function() {
      // if this word was recalled previously change the duration to 0 seconds also
      if (WordListIndex[ind] > -99) {
        return TimePerWord
      }
      else {
        return 0
      }
    },
    on_finish: function(data) {
      data.task = 'word'
      // updatethe trial counter
      TrialCount++
    },
  };
// THE FOLLOWING IS NOT USED
var VisualStimulus = {
    type: jsPsychHtmlButtonResponseTouchscreen,
    stimulus: function()
      {
        // find what trial index this is
        ind = (TrialCount) % NWords
        // check to see if this trial was recalled in the previous block
        if (WordListIndex[ind] > -99) {
          // if NOT, then present the word
          Stim = jsPsych.timelineVariable('Word')
        }
        else {
          // if YES, then present the fixation cross
          Stim = '<p class="Fixation">+</p>'
        }
        // return the chosen stimulus
        console.log(Stim)        
        Stim = '<p  class="Fixation">' +Stim+'</p>'
        return Stim
      },
    choices: [], 
    margin_horizontal: GapBetweenButtons,
    post_trial_gap: 0,
    trial_duration: function() {
      // if this word was recalled previously change the duration to 0 seconds also
      if (WordListIndex[ind] > -99) {
        return TimePerWord
      }
      else {
        return 0
      }
    },
    prompt: SRTWordPrompt, //Add this to config file
    on_finish: function(data) {
      data.task = 'word'
      // updatethe trial counter
      TrialCount++
    }
  };

/*var RecallRequest01 = {
    type: jsPsychHtmlButtonResponseTouchscreen,
    stimulus: 'Please, recall the full list.<p><span id="clock">1:00</span></p>',
    choices: ['Next'], 
    margin_horizontal: GapBetweenButtons,
    post_trial_gap: 0,
    prompt: SRTWordPrompt, //Add this to config file
    on_start: function(SimpleList) {
      // reset the list of indices
      WordListIndex = CreateWordListIndex(WordList)
      HeardList = []
      BlockRecallCount = 0
      BlockIntrusionCount = 0
      const commands01 = {'*search': FindRecalledWords01};
      annyang.start({autorestart: false, continuous: true});
      annyang.addCommands(commands01);
      //console.log('Started')
    },
    on_finish: function(data){
      annyang.abort()
      data.RecallList = WordListIndex
      data.HeardList = HeardList
      data.RecallCount = BlockRecallCount
      data.NIntrusions = BlockIntrusionCount
      data.task = 'Recall'
      BlockCount++
      console.log(ResponseArray)
      clearInterval(interval);
    },
    on_load: function(){ // This inserts a timer on the recall duration
    var wait_time = RecallDuration * 1000; // in milliseconds
    var start_time = performance.now();
    document.querySelector('button').disabled = false;
    interval = setInterval(function(){
    time_left = wait_time - (performance.now() - start_time);
      var minutes = Math.floor(time_left / 1000 / 60);
      var seconds = Math.floor((time_left - minutes*1000*60)/1000);
      var seconds_str = seconds.toString().padStart(2,'0');
      document.querySelector('#clock').innerHTML = minutes + ':' + seconds_str
      if(time_left <= 0){
        document.querySelector('#clock').innerHTML = "0:00";
        document.querySelector('button').disabled = false;
        clearInterval(interval);
        // STOP VOICE RECORDING!!!
      }
    }, 250)
    }
  }
  */
// Define instructions
var Instructions = {
      type: jsPsychHtmlButtonResponseTouchscreen,
      stimulus: function()
      {
        var stim = jsPsych.timelineVariable('page') // Variable in the config file
        return stim
      },
      post_trial_gap: 0,
      margin_horizontal: GapBetweenButtons,
      prompt: '',
      choices: ['Next'], 
    }  
// =======================================================================    
// Define procedures using the stimuli
// Define the test procedure which does NOT provide feedback
  var instr_procedure = {
      timeline: [Instructions],
      timeline_variables: SRTInstructions,
      randomize_order: false,
      repetitions: 1,
    }

  var PresentListOfWords = {
      timeline: [fixation, PresentSelectiveWords_Audio],
      timeline_variables: WordList,
      repetitions: 1,
      randomize_order: false      
  }
  var recall = {
      timeline: [ManualRecallTrial],
      timeline_variables: WordList,

      randomize_order: false,
      repetitions: 1,      
  }
  var Blocks = {
    timeline: [PresentListOfWords, recall],
    randomize_order: false,
    repetitions: NBlocks,
  } 
var thank_you = {
    timeline: [Instructions],
    timeline_variables: ThankYouText,
    randomize_order: false,
    repetitions: 1,
  }  
// ======================================================================= 
// Add procedures to the timeline
timeline.push(preload_audio)
timeline.push(preload_silence)
timeline.push(recall)
timeline.push(instr_procedure)

timeline.push(Blocks)
timeline.push(thank_you)
/*timeline.push(block1);
//timeline.push(recall1);
timeline.push(block1);
timeline.push(recall1);
timeline.push(block1);
timeline.push(recall1);
timeline.push(block1);
timeline.push(recall1);
timeline.push(block1);
timeline.push(recall1);*/


