interface ObjectValues {
    periodLength: number,
    trainingDays: number,
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average:number;
}

export const calculateExercises = (data: Array<number>, target: number): ObjectValues => {
    let hours = 0;
    let days = 0;
    const length = data.length;
    let success = false;
    let rating = 0;
    let ratingDescription = '';

    data.forEach(day => {
        if (!isNaN(day)) {
        hours += day;
        if (day !== 0) {
            days = days + 1;
        }
        } else {
          throw new Error('All provided values were not numbers!');
        }
    });
    const average = hours/length;

    if (average >= target) {
        success = true;
    }

    if (average < 1) {
        rating = 1;
        ratingDescription = 'you could try a little harder next time';
    }
    if (average > target + 0.5) {
        rating = 3;
        ratingDescription = 'doing good mut menkööt';
    } else {
        rating = 2,
        ratingDescription = 'not too bad but could be better';
    }

    return {
      periodLength: length, 
      trainingDays: days,
      success: success,
      rating: rating,
      ratingDescription: ratingDescription,
      target: target,
      average: average
    };
};