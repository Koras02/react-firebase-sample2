import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
    // 이메일 비밀번호 비밀번호 확인에 대한 useRef 주소가 필요하기 때문에 이 세게를 묶어 선언한다.
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    
    // 회원 가입 시 이벤트를 가져옴 + 현재 가입된 유저가 있다는 것을 판단하고 경고를 내주는 것을 currentUser로 선언
    // 현재 사용자 currentUser는 현재 필요 없기 떄문에 지운다.
    const { signup } = useAuth()

    // 오류 걸러냄
    const [error, setError] = useState("")

    // 로딩
    const [loading, setLoading] = useState(false);


    // 회원가입시 로그인창으로 이동 
    const history = useHistory();

     // async 주의
     async function handleSubmit(e) {
        e.preventDefault()

        // 비밀번호가 재획인 값과 동일한지 판단해서 값이 아닐경우 경고를 줌
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
              return setError("비밀번호가 동일하지 않습니다.")
        }

        // 오류가 발생할때 회원가입을 막기위한 try설정
        try {
            // 시도전 오류를 먼저
            setError("")
            // 계정을 여러번 만들지 않게 방지하도록 setLoading값을 설정
            setLoading(true)
            // 로그인시 브라우저가 확인할 이메일 비밀번호를 참고하게 만듬
            // 오류가 발생할떄 비동기식 함수를 작동해서 이 액션을 기다리다 오류를 뱉어내기
            // await signup(emailRef.current.value, passwordRef.current.value)
            // 현재 로그인을 최종적으로 보여주기 위해 await 에 login
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/');

        } catch {
            // 오류 설정
            // 비밀번호 오류가 발생하는 이유는 이미 가입된 중복정보 이기 떄문이다. 
            setError("비밀번호가 맞지않아 회원가입이 불가능합니다.")
        }
        // 모든 작업이 완료될떄 로딩을 비활성
        setLoading(false)
 

    }

    return (
        <>
        <Card>
            <Card.Body>
                  <h2 className="text-center mb-4">회원 가입</h2>
                  {/* 가입된 사용자는 문자열로 판단하기 때문에 JSON으로 반환한다. */}
               
                  {/* {JSON.stringify(currentUser) } */}

                  {/* 현재 가입된 이메일이라 알리기 위해 currentUser에 현재 가입된 이메일을 대입  */}
                  {/* 이곳에서 바로 정보 확인 */}
                  {/* {currentUser.email}  */}
                  {/* {currentUser && currentUser.email} */}

                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                      <Form.Group id="email">
                         <Form.Label>이메일 주소</Form.Label>
                         <Form.Control type="email" ref={emailRef} required  />
                      </Form.Group>
                      <Form.Group id="password">
                         <Form.Label>비밀번호</Form.Label>
                         <Form.Control type="password" ref={passwordRef} required  />
                      </Form.Group>
                      <Form.Group id="password-confirm">
                         <Form.Label>비밀번호 재확인</Form.Label>
                         <Form.Control type="password" ref={passwordConfirmRef} required  />
                      </Form.Group>
                      <br/>
                      {/* 기존 회원 비활성 */}
                      <Button disabled={loading} className="w-100" type="submit">
                          회원 가입
                    </Button>
                  </Form>
            </Card.Body> 
            </Card>
            <div className="w-100 text-center mt-2">
               로그인을 하시겠습니까? <Link to="/login">로그인
               </Link>
            </div>
        </>
    )
}
