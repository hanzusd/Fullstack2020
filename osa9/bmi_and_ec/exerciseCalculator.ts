interface ObjectValues {
    periodLength: number,
    trainingDays: number,
    success: boolean;
    rating: number;
    ratingDescription: String;
    target: number;
    average:number;
}

const calculateExercises = (data: Array<number>, target: number) => {
    var hours = 0
    var days = 0
    var length = data.length
    var success = false
    var rating = 0
    var ratingDescription = ''

    data.forEach(day => {
        if (!isNaN(day)) {
        hours += day
        if (day !== 0) {
            days = days + 1
        }
        } else {
          throw new Error('All provided values were not numbers!')
        }  
    });
    const average = hours/length

    if (average >= target) {
        success = true
    }

    if (average < 1) {
        rating = 1;
        ratingDescription = 'you could try a little harder next time'
    }
    if (average > target + 0.5) {
        rating = 3
        ratingDescription = 'doing good mut menkööt'
    } else {
        rating = 2,
        ratingDescription = 'not too bad but could be better'
    }

    const calculator = (answer:ObjectValues) => {
      console.log(answer)
    }

    calculator({
      periodLength: length, 
      trainingDays: days,
      success: success,
      rating: rating,
      ratingDescription: ratingDescription,
      target: target,
      average: average
    })
}

const target: number = Number(process.argv[2])
var array: Array<number> = []
for (let i = 3; i < process.argv.length; i++) {
    array.push(Number.parseFloat(process.argv[i]))
}

try {
    calculateExercises(array, target)
} catch (error: unknown) {
   let errorMessage = 'Something bad happened.'
   if (error instanceof Error) {
     errorMessage += ' Error: ' + error.message;
   }
   console.log(errorMessage);
}