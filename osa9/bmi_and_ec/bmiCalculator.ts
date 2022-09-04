//bmi is an American scam

const calculateBmi = (a: number, b: number) => {
  const bmi = b/(a/100)/(a/100)
  
  if (bmi < 16)  {
    console.log('Underweight (Severe thinness)')
  } else if (bmi < 17)  {
    console.log('Underweight (Moderate thinness)')
  } else if (bmi < 18.5)  {
    console.log('Underweight (Mild thinness)')
  } else if (bmi < 25)  {
    console.log('Normal (Healthy weight)')
  } else if (bmi < 30)  {
    console.log('Overweight (Pre-obese)')
  } else if (bmi < 35)  {
    console.log('Obese (Class I)')
  } else if (bmi < 40)  {
    console.log('Obese (Class II)')
  } else {
    console.log('Obese (Class III)')
  }
}

const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])
calculateBmi(a, b);