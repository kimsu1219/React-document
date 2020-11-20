import React, {useEffect, useState} from 'react'

const name = 'josh'
const arr1 = ['a','b']

const user = {
  firstName : 'Harper',
  lastName : 'perez'
}

function formatName(user) {
  return user.firstName + ' ' + user.lastName
}

const getGreeting = (user) => {
  if (user) {
    return <h1>hello, {formatName(user)} bye
     </h1>
  }
  return <h1>hello, stranger</h1>
}

// const element = <h1>Hello, {name}</h1>
const element = (
  <h1>hi<h2>hello</h2></h1>
  // <div>
  //   <h1>
  //   {/* hello {formatName(user)} */}
  //   {getGreeting(user)}
  //   </h1>
  //   <h2>hi</h2>
  // </div>
)

const element2 = <div tabIndex="0">tabIndex</div>
const element3 = (
  <div>
  <h1>Hello!</h1>
  <h2>Good to see you here.</h2>
  </div>
)

// element4, element5는 동일
const element4 = (
  <h1 className="greeting">
    hello, world
  </h1>
)
const element5 = React.createElement(
  'h1',
  {className: 'greeting'},
  'hello, world'
)

//component (Class)
// class Welcome extends React.Component {
//   render () {
//     return <h1>{this.props.firstname}</h1>
//   }
// }

// componnent (function)
function Welcome(props) {
  return <h1>{props.firstname}</h1>
}
// const element7 = <Welcome firstname='sara'/>

//component합성
function Composing() {
  return (
    <div>
      <Welcome firstname="sara"></Welcome>
      <Welcome firstname="cahal"></Welcome>
      <Welcome firstname="edite"></Welcome>
    </div>
  )
}

function formatDate(date) {
  return date.toLocaleDateString();
}

//comment 컴포넌트 추출
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author}/>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  )  
}

//Avatar
{/* <Avatar user={props.author}/> */}
//   <img className="Avatar"
//    src={props.author.avatarUrl}
//    alt={props.author.name}
// /> 
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  )
}

//UserInfo
{/* <div className="UserInfo">
  <Avatar user={props.author}/>
  <div className="UserInfo-name">
    {props.author.name}
  </div>
</div> */}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user}/>
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  )
}

const comment = {
  author: {
    name: 'kitty',
    avatarUrl: 'https://placekitten.com/g/64/64'
  },
  date: new Date(),
  text: 'Hi'
}
// <Comment
//   date={comment.date}
//   text={comment.text}
//   author={comment.author}
// />,

// const tick = () => {
//   const element6 = (
//     <div>
//       <h1>Hello</h1>
//       <h2>it is {
//         new Date().toLocaleTimeString()
//       }</h2>
//     </div>
//   );
//   ReactDOM.render(
//     element6, 
//     document.getElementById('root')
//   )
// }

//Clock 컴포넌트 재사용, 캡슐화
function Clock(props) {
  return (
    <div>
        <h1>Hello</h1>
        <h2>it is 
        {props.date.toLocaleTimeString()}</h2>
    </div>
  )
}

class Clock2 extends React.Component {
  //this.state 지정, class컴포넌트는 props로 기본 constructor 호출
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  //생명주기 메소드
  //componentdidmount->component 출력물이 dom에 랜더링된 후 실행
  componentDidMount() {
    this.timerID = setInterval(()=>this.tick(), 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }
  render() {
    return (
      <div>
        <h1>Hello_clock2</h1>
        <h2>it is 
        {this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}

// function tick() {
//   ReactDOM.render(
//     <Clock2 />,
//     document.getElementById('root')
//   );
// }
// setInterval(tick, 1000);

//event 처리
function ActionLink() {
  const handleClick = (e) => {
    e.preventDefault(); //false 기본동작 방지
    console.log('clicked')
  }

  return (
    //javascript: onclick="handleClick()"
    <a href="#" onClick={handleClick}>
      click me
    </a>
  )
}

class Toggle extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {isToggleOn: true};
    // console.log(this)
    //콜백에서 this작동위해 binding필요
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state)=>({
      isToggleOn: !state.isToggleOn
    }))
    console.log(this.state.isToggleOn)
  }

  render() {
    return (
      //button클릭시 handleClick함수 실행
      //button 내용 this.state.toggle true/false에 따라 바뀔수있게      
      <button onClick={this.handleClick}>{this.state.isToggleOn ? 'ON' : 'OFF' }</button>
    )
  }
}

//조건 렌더링(if, 조건문)
function UserGreeting(props) {
  return (
    <h1>welcome back</h1>
  )
}
function GuestGreeting(props) {
  return (
    <h1>please sign up</h1>
  )
}
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) return <UserGreeting />
  return <GuestGreeting />
}

//엘리먼트 변수 
function LoginBtn(props) {
  return (
    <button onClick={props.onClick}>Login</button>
  )
}
function LogoutBtn(props) {
  return(
    <button onClick={props.onClick}>Logout</button>
  )
}
//상태에따라 btn 렌더링
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false}
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }
  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn
    
    let button;
    if (isLoggedIn) {
      button = <LogoutBtn onClick={this.handleLogoutClick}/>
    }
    else {
      button = <LoginBtn onClick={this.handleLoginClick}/>
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn}/>
        {button}
      </div>
    )
  }
}

//논리연산자 
function Mailbox(props) {
  const unreadMessage = props.unreadMessage;
  return (
    <div>
      <h1>message</h1>
        {unreadMessage.length > 0 && // if 조건문대신 &&연산자 사용, true인 경우 뒤의 엘리먼트 출력
          <h2>
            unread message{unreadMessage.length}
          </h2>
        }
    </div>
  )
}
const messages = ['React', 'Re: React', 'Re:Re: React']

//컴포넌트 숨길때 null return
function WarningBanner(props) {
  if (!props.warn) return null;
  return (
    <div className="warning">
      warning!
    </div>
  )
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({showWarning: !state.showWarning}))
  }
  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning}/>
        <button onClick={this.handleToggleClick}>{this.state.showWarning ? 'Hide' : 'Show'}</button>
      </div>
    )
  }
}

//list
function NumberList(props) {
  // const numbers = [1,2,3,4,5]
  const numbers = props.numbers;
  const listItems = numbers.map((num)=>
  //key prop 필요, 배열내부의 엘리먼트에 지정해야함
    <li key={num.toString()}>{num}</li>
  );
  return <ul>{listItems}</ul>
}
//key
const numbers = [1,2,3,4,5]
function ListItem(props) {
  return (
    <li>{props.value}</li>
  )
}

function NumList(props) {
  const numbers = props.numbers;
  //map ()=>expression // 중괄호 필요 없음!!!
  const listItems = numbers.map((number) =>
  //map함수 내부에 있는 엘리먼트에 key넣는것이 좋음 
    <ListItem key={number.toString()} value={number}/>
  )
  // console.log(listItems)
  return (
    <ul>{listItems}</ul>
  )
}
//Numlist map함수결과 인라인으로
function NumListInline(prosp) {
  return (
    <ul>
      {numbers.map((number)=>
      <ListItem key={number.toString()} value={number}/>
      )}
    </ul>
  )
}

//두개의 다른 배열을 만들 때 동일한 key 사용 가능
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post)=>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  )
  const content = props.posts.map((post)=>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>  
  )
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  )
}
const posts = [
  {
    id: 1,
    title: 'hello world',
    content: 'welcome to learning react!'
  },
  {
    id: 2,
    title: 'Installation',
    content: 'you can install React from npm!'
  },
]
//key는 component로 전달 할 수 없음
//props.key는 불러올 수 없어서 같은 값을 가지고있는 props.id를 만들어서 사용해야함
const content = posts.map((post)=>
  <Blog
    key={post.id}
    id={post.id}
    title={post.title}
  />
) 

//form, input 엘리먼트
class NameFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }
  handleSubmit(event) {
    // alert('a name was submitted: ' + this.state.value);
    alert(`a name was submitted: ${this.state.value}`);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name: <input type="text" value= {this.state.value} 
        onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}

//text area
class EssayFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'please write essay'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }
  handleSubmit(event) {
    // alert('a name was submitted: ' + this.state.value);
    alert(`essay was submitted: ${this.state.value}`);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Essay: 
          <textarea value={this.state.value} 
          onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}

//select 
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    //seleted 옵션 -> value값 넣어주기
    this.state = {value: 'coconut'}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }
  handleSubmit(event) {
    alert(`your favorite : ${this.state.value}`)
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          pick
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grape">grape</option>
            <option value="lime">lime</option>
            <option value="coconut">coconut</option>
            <option value="mango">mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

//input 엘리먼트 제어
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this. state ={
      isGoing: true, //checkbox checked
      numberOfGuest: 2
    };
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // console.log(name) //isGoing
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input 
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          number of guest:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuest}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    )
  }

}

// class TemperatureInput extends React.Component {
//   constructor(props) {
//     super(props)
//     this.handleChange = this.handleChange.bind(this)
//     this.state = {temperature: ''}
//   }
//   handleChange(e) {
//     this.setState({temperature: e.target.value})
//   }
//   render() {
//     const temperature = this.state.temperature;
//     const scale = this.props.scale;

//     return (
//       <fieldset>
//         <legend>Enter temperature{scaleNames[scale]}:</legend>
//         <input value={temperature} onChange={this.handleChange}/>
//       </fieldset>
//     )
//   }
// }

//state

//celcius props를 받아서 조건문 결과 출력
function BoilingVerdict(props) {
  if (props.celsius >= 100) return <p>boiled</p>
  return <p>not boiled</p>
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}
//화씨->섭씨
function toCelsius(f) {
  return (f - 32) * 5 / 9;
}
//섭씨->화씨
function toFahrenheit(c) {
  return (c * 9 / 5) + 32;
}

//temperature변환
//매개변수 숫자, toFahrenheit or toCelsius
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if(Number.isNaN(input)) return ''
  const output = convert(input);
  const rounded = Math.round(output * 1000)/1000;
  return rounded.toString();
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {temperature: ''}
  }
  handleChange(e) {
    // this.setState({temperature: e.target.value})
    console.log(this.props.onTemperatureChange)
    this.props.onTemperatureChange(e.target.value)
  }
  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;

    return (
      <fieldset>
        <legend>Enter temperature{scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange}/>
      </fieldset>
    )
  }
}

//input 값을 this.state.temperature에 저장, 그 값에대한BoilingVerdict랜더링
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
    this.state = {temperature: '', scale: 'c'}
  }
  // ?setState :필요없음??
  handleCelsiusChange(temperature) {
    this.setState({
      temperature,
      scale: 'c'
    })
    // console.log(this.state.scale, this.state.temperature)
  }
  handleFahrenheitChange(temperature) {
    this.setState({
      temperature,
      scale: 'f'
    })
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict
          celsius={parseFloat(celsius)}
        />
      </div>
    )
  }



}


  // render () {
  //   return (
  //     <div>
  //     <TemperatureInput scale="c"/>
  //     <TemperatureInput scale="f"/>
  //     </div>
  //   )
  // }

  // constructor(props) {
  //   this.handleChange = this.handleChange.bind(this)
  //   this.state = {temperature: ''};
  // }
  // handleChange(e) {
  //   this.setState({temperature: e.target.value})
  // }
  // render() {
  //   const temperature = this.state.temperature
  //   return(
  //     <fieldset>
  //       <legend>enter temperature</legend>
  //       <input value={temperature} onChange={this.handleChange}/>
  //       <BoilingVerdict celsius={parseFloat(temperature)}/>
  //     </fieldset>
  //   )
  // }


// react 엘리먼트 root dom노드에 렌더링
export default Calculator
