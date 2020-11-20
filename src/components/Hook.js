import React, {useEffect, useState} from 'react'

function Hook () {
    //useState [현재 state값,이값을 업데이트하는 함수]
    //인자-> 초기 state 값(숫자, 문자)
    //useState의 return 값 [state변수, 변수갱신함수]
    const [count, setCount] = useState(0)
    
    //useEffect 컴포넌트가 랜더링될 떄마다(랜더링 된 후) 특정 작업 수행
    //class componentdidmount, comonentdidupdate를 합친 형태
    //두번째 매개변수로 빈배열[]을 넣으면 처음 랜더링될 떄만 실행, 업데이트할 경우 실행안됌
    //두번째 매개변수 [검사하고싶은 값] 검사하고싶은 값이 바뀔때만 특정 작업 수행
    useEffect(() => {
        document.title = `you clicked ${count} times`
    })
    
    return (
        <div>
            <p>this is p tag : {count}</p>
            <button onClick={()=>setCount(count+1)}>click</button>
        </div>
    )
}

//cf) class로 구현
class ExampleClass extends React.Component {
    constructor(props) {
        super(props)
        this.state={count:0}
    }

    componentDidMount() {
        document.title = ` you clicked ${this.state.count} times`
    }
    componentDidUpdate () {
        document.title = ` you clicked ${this.state.count} times`
    }
    render() {
        return (
            <div>
                <p>clicked {this.state.count}</p>
                <button onClick={()=>{
                    this.setState({count: this.state.count+1})
                }}>click here</button>
            </div>
        )
    }
}



export default Hook;