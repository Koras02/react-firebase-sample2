import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function UpdateProfile() {
    // 이메일 비밀번호 비밀번호 확인에 대한 useRef 주소가 필요하기 때문에 이 세게를 묶어 선언한다.
        const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()


    // 사용자를 인증해서 프로필을 가져오게함
    // 업데이트할 사용자 , 이메일 주소 비밀번호를 불러온다.
    const { currentUser, updatePassword, updateEmail } = useAuth()

    // 오류 걸러냄
    const [error, setError] = useState("")

    // 로딩
    const [loading, setLoading] = useState(false);


    // 회원가입시 로그인창으로 이동 
    const history = useHistory();

     // 비동기가 아니기 때문에 async 제거
    function handleSubmit(e) {
        e.preventDefault()

        // 비밀번호가 재획인 값과 동일한지 판단해서 값이 아닐경우 경고를 줌
         
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
              return setError("비밀번호가 동일하지 않습니다.")
        }

          
        // 몇가지의 약속을 선언함
        const promises = []
        // 변경시 로딩
        setLoading(true)
        // 시도전 오류를 먼저 깜빡이게 설정
        setError("")

        // 이메일 주소가 변경될때 약속
        if (emailRef.current.value !== currentUser.emil)
        {
            promises.push(updateEmail(emailRef.current.value))
        }

        // 바뀔이메일주소를 판단하고 기다린뒤 업데이트할 비밀번호를 선언하는 칸 
        if (passwordRef.current.value) {
            // 비밀번호가 변경될때를 약속
            promises.push(updatePassword(passwordRef.current.value))
        }

        // 모든 약속 배열을 Promise로 전달
        Promise.all(promises)
        .then(() => {
            // 모든약속이 만족될시 실행되는 이벤트 == 업데이트 즉시 시작 홈페이지로 이동
            history.push("/")
        })
        .catch(() => {
            // 오류 발생시
            setError("프로필을 업데이트 할수 없습니다.")
        })
        .finally(() => {
            // 성공여부 관련없이 실행
            setLoading(false)
        })

 

    }

    // required 를 지우면 하나의 비밀번호만 입력하고 업데이트시 이것을 막음

    return (
        <>
        <Card>
            <Card.Body>
                  <h2 className="text-center mb-4">프로필 업데이트</h2>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                      <Form.Group id="email">
                         <Form.Label>이메일 주소</Form.Label>
                         {/* 기본 값을 이메일로 설정 */}
                         <Form.Control 
                         type="email" 
                         ref={emailRef} 
                         required 
                         defaultValue={currentUser.email} />
                      </Form.Group>
                      <Form.Group id="password">
                         <Form.Label>비밀번호</Form.Label>
                         <Form.Control 
                         type="password" 
                         ref={passwordRef} 
                         placeholder="비밀번호를 입력해주세요"
                         />
                      </Form.Group>
                      <Form.Group id="password-confirm">
                         <Form.Label>비밀번호 재확인</Form.Label>
                         <Form.Control 
                         type="password" 
                         ref={passwordConfirmRef}
                         placeholder="비밀번호를 입력해주세요"  />
                      </Form.Group>
                      <br/>
                      {/* 기존 회원 비활성 */}
                      <Button disabled={loading} className="w-100" type="submit">
                          프로필 업데이트
                    </Button>
                  </Form>
            </Card.Body> 
            </Card>
            <div className="w-100 text-center mt-2">
               <Link to="/">취소</Link>
            </div>
        </>
    )
}
