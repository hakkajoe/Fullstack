const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p><b>Total of {totalExercises} exercises</b></p>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part}/>
      ))}
      <Total parts={parts} />
    </div>
  )
}

const Header = ({ header }) => {
  return (
    <h2>{header}</h2>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )  
}

export default Course