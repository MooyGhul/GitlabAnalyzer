export default function ScoreBoard (props) {
    return (
        <div>
            <h1> ScoreBoard </h1>
            <p>Total Commit : {props.totalCommit}</p>
            <p>Total MR : {props.TotalMR}</p>
            <p>Total JS Files : {props.TotalJSFiles}</p>
            <p>Total Score : {props.TotalScore}</p>
        </div>
    );
}