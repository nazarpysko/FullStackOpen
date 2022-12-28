const Total = ({ parts }) => (
    <b>total of {parts.reduce((total, part) => total + part.exercises, 0)} exercises</b>
)

export default Total