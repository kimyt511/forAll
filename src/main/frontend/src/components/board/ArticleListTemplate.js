import {useCallback, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const ArticleListTemplate = ({category, postList, preview= false}) => {
    const navigate = useNavigate();
    const [newPost, setNewPost] = useState(false);
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");

    const postContentPlaceholder = "포 올은 누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 제정하여 운영하고 있습니다. 위반 시 게시물이 삭제되고 서비스 이용이 일정 기간 제한될 수 있습니다.\n\n 아래는 이 게시판에 해당하는 핵심 내용에 대한 요약 사항이며, 게시물 작성 전 커뮤니티 이용규칙 전문을 반드시 확인하시기 바랍니다.\n\n※ 정치, 사회 관련 행위 금지\n-국가기관, 정치 관련 단체, 언론, 시민단체에 대한 언급 혹인 이와 관련한 행위\n-정책, 외교 또는 정책, 정파에 대한 의견, 주장 및 이념, 가치관을 드러내는 행위\n-성별, 종교, 인종, 출신, 지역, 직업, 이념 등 사회적 이유에 대한 언급 혹은 이와 관련한 행위\n,-위와 같은 내용으로 유추될 수 있는 비유, 은어 사용 행위\n*해당 게시물은 시사, 이슈 게시판에만 작성 가능합니다.";
    const onChangePostTitle = useCallback((e)=>setPostTitle(e.target.value),[]);
    const onChangePostContent = useCallback((e)=>setPostContent(e.target.value),[]);
    const UploadPost = () => {
        axios.post("/api/v1/articles",{
            title: postTitle,
            content: postContent,
            // 추후 new Date(writtenAt)으로 재성성 가능
            writtenAt: new Date().toDateString(),
            category: category,
            userId: sessionStorage.getItem("user_id")
        })
    };
    return (
        <div>
            <div>
                {!preview ? (
                    <div>
                        <button onClick={()=>setNewPost(true)}>새 글을 작성해주세요!</button>
                        {newPost ? (
                            <div>
                                <input value={postTitle} onChange={onChangePostTitle} placeholder={"글 제목"}/>
                                <input value={postContent} onChange={onChangePostContent} placeholder={postContentPlaceholder}/>
                                <button>첨부파일</button>
                                <button onClick={UploadPost}>글 올리기</button>
                            </div>
                        ):null}
                    </div>
                ):null}
                {postList ? (
                    <div>
                        {postList.map((post, idx) => (
                            <div key={idx} onClick={() => navigate("/post/"+post.id)}>
                                <p>{post.title}</p>
                                {!preview ? <p>{post.content}</p> : null}
                                <p>댓글:{post.comments ? post.comments.length : 0}</p>
                            </div>
                        )
                        )}
                    </div>
                ): null}
            </div>
        </div>
    )
};

export default ArticleListTemplate;