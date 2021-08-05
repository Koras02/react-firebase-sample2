import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';


export default function ForgotPassword() {
   // 이메일 비밀번호 비밀번호 확인에 대한 useRef 주소가 필요하기 때문에 이 세게를 묶어 선언한다.
   const emailRef = useRef()
   
   // 회원 가입 시 이벤트를 가져옴 + 현재 가입된 유저가 있다는 것을 판단하고 경고를 내주는 것을 currentUser로 선언
   // 현재 사용자 currentUser는 현재 필요 없기 떄문에 지운다.
   const { resetPassword } = useAuth()
   // 오류 걸러냄
   const [error, setError] = useState("")
   
   // 사용자에게 재설정할 메세지를 보냄
   const [message, setMessage] = useState("")

   // 로딩
   const [loading, setLoading] = useState(false);
      

//    // 로그인 성공시 history 리다이렉션 이동 
//    const history  = useHistory();

    // async 주의
    async function handleSubmit(e) {
       e.preventDefault()

 

       // 오류가 발생할때 회원가입을 막기위한 try설정
       try {
           setMessage('');
           // 시도전 오류를 먼저
           setError("")
           // 계정을 여러번 만들지 않게 방지하도록 setLoading값을 설정
           setLoading(true)
            // 비밀번호를 찾기위한 await 선언
            await resetPassword(emailRef.current.value)  
            
            // 메세지 설정 
            setMessage('이메일 링크에 재설정할 링크를 첨부했습니다.')

        //    // 로그인시 이동 
        //      비밀번호를 재설정할때 페이지 변경이 되지않도록 선언ㅇ하지않는다.
        //    history.push("/")

        
       } catch {
           // 오류 설정
           // 비밀번호가 없을때 오류를 반환
           setError("비밀번호를 찾을수 없습니다..")
       }
       // 모든 작업이 완료될떄 로딩을 비활성
       setLoading(false)


   }

   return (
       <>
       <Card>
           <Card.Body>
                 <h2 className="text-center mb-4">비밀번호 찾기</h2>
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
                     {/* 기존 회원 비활성 */}
                     <Button disabled={loading} 
                     className="w-100 mt-3" 
                     type="submit">
                       비밀번호 찾기
                   </Button>
                 </Form>
                 {/* 로그인 페이지로 다시 돌아갈때  */}
               <div className="w-100 text-center mt-3">
                <Link to="/login"
                 style={{ textDecoration: "none"}}
                >돌아가기</Link>
             </div>  
           </Card.Body> 
           </Card>
           <div className="w-100 text-center mt-2">
              회원 가입 하셨나요?
               <Link to="/signup" style={{ textDecoration: 'none' }}>
                   회원가입
                </Link>
           </div>
       </>
   )
}
