const Header = ({name}) => (
    <h1>{name}</h1>
)

const Content = ({parts}) => (
    <>
        {parts.map( part => 
            <Part key={part.id} part={part} />
        )}
    </>
)

const Part = ({part}) => (
    <p>{part.name} {part.exercises}</p>
)

const Total = ({ parts }) => (
    <b>total of {parts.reduce((total, part) => total + part.exercises, 0)} exercises</b>
)

const Course = ({ course }) => (
    <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
    </div>
)

export default Course