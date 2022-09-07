//bmi is an American scam

export const calculateBmi = (a: number, b: number): string => {
  const bmi = b/(a/100)/(a/100)
  
  if (bmi < 16)  {
    return 'Underweight (Severe thinness)'
  } else if (bmi < 17)  {
    return 'Underweight (Moderate thinness)'
  } else if (bmi < 18.5)  {
    return 'Underweight (Mild thinness)'
  } else if (bmi < 25)  {
    return 'Normal (Healthy weight)'
  } else if (bmi < 30)  {
    return 'Overweight (Pre-obese)'
  } else if (bmi < 35)  {
    return 'Obese (Class I)'
  } else if (bmi < 40)  {
    return 'Obese (Class II)'
  } else {
    return 'Obese (Class III)'
  }
}