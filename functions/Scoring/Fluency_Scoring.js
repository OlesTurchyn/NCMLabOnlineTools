function Fluency_Scoring(data) {
	console.log(data)
	temp = data.filter({task: 'Recall'})
	console.log(temp)
	console.log(temp.trials[temp.trials.length - 1])
	var Count  = temp.trials[temp.trials.length - 1].count
	Results = {}
	Results.PrimaryResults = {}
	Results.PrimaryResults['Accuracy'] = Count
	Results.AllResults = {}
	Results.AllResults['Accuracy'] = Count
	return Results
}