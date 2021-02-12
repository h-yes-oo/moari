import React, { FC, ReactNode, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules'
import Loading from '../Loading';
import palette from 'constants/palette';
import sampleImg from 'assets/samples/likelion.jpg';
import axios from 'axios';
import Story from 'types';
import { useDropzone } from 'react-dropzone';
import PhotoSlider from './PhotoSlider';

interface StoryListProps {
    clubId: string;
}

const StoryWrapper = styled.div`
    min-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;

    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(188, 156, 255, 0.5);
    border-radius: 31px;

    padding: 30px 20px 80px 20px;
    margin: 0px 20px 50px 20px;
`

const Content = styled.div`
    //width: 540px;
    margin-top: 54px;

    font-family: Montserrat;
    font-style: normal;
    font-size: 18px;
    line-height: 24px;

    display: flex;
    align-items: center;
    text-align: center;

    white-space: pre-line;

    color: ${palette.dark100.toString()};
`

const ContentInput = styled.textarea`
    width: 100%;
    margin-top: 54px;

    font-family: Montserrat;
    font-style: normal;
    font-size: 18px;
    line-height: 24px;
    height: 87px;

    display: flex;
    align-items: center;

    white-space: pre-line;

    color: ${palette.dark100.toString()};
    border: 1px solid ${palette.primaryGradient.toString()};
    box-sizing: border-box;
    border-radius: 4px;

    &::-webkit-scrollbar { width: 0 !important };
    &:focus {
        outline: none;
    }
`

const Date = styled.div`
    position: absolute;
    right: 30px;
    bottom: 24px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;

    display: flex;
    align-items: center;
    text-align: center;

    color: ${palette.dark75.toString()};
`

const DeleteButton = styled.a`
    position: absolute;
    left: 30px;
    bottom: 24px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;

    display: flex;
    align-items: center;
    text-align: center;

    color: ${palette.dark75.toString()};
`

const SumbitButton = styled.div`
    position: absolute;
    right: 30px;
    bottom: 24px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;

    display: flex;
    align-items: center;
    text-align: center;

    color: ${palette.dark75.toString()};
    cursor: pointer;
`

const Root = styled.div`
    display:flex;
    flex-direction: column;
    margin-top: 30px;
    min-width: 980px;
`

const NewButton = styled.a`
    margin-bottom: 20px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    color: ${palette.dark50.toString()};

    cursor: pointer;
`

const Row = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
`

const Col = styled.div`
    position: relative;
    display: block;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 50%;
    min-height: 1px;
`


const ThumbsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16;
  position: absolute;
  bottom: 10px;
  overflow: scroll;
  width: 100%;
`

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 20px;
  margin-left: 20px;
  padding: 4px;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  justify-content: center;
`

const Img = styled.img`
  display: block;

`

const Box = styled.div`
    position: relative;
    width: 100%;
    border: 1px solid ${palette.dark50.toString()};
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:before {
        content: "";
        float: left;
        padding-top: 100%;
    }
`

type dropFile = {
    name: any;
    preview: string;
}


const StoryList: FC<StoryListProps> = ({ clubId }) => {
    const [stories, setStories] = useState<Story[]>([]);
    const [showNewForm, setShowNewForm] = useState<boolean>(false);
    const [content, setContent] = useState<string>('');

    const [files, setFiles] = useState<(Blob & dropFile)[]>([]);
    const {getRootProps, getInputProps} = useDropzone({
      accept: 'image/*',
      onDrop: (acceptedFiles) => {
          setFiles([...files, ...acceptedFiles.map(file => Object.assign(file, {
              preview: URL.createObjectURL(file)
          }))]);
      }
    });
    
    const thumbs = files.map((file: Blob & dropFile) => (
      <Thumb key={file.name}>
        {/* <ThumbInner> */}
          <Img
            src={file.preview}
            alt={file.name}
          />
        {/* </ThumbInner> */}
      </Thumb>
    ));
  
    useEffect(() => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: dropFile) => URL.revokeObjectURL(file.preview));
    }, [files]);

    const saveStory = () => {
        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        for( let i = 0; i < files.length; i++){
            formData.append("photos",files[i])
        }

        formData.append("clubId",clubId);
        formData.append("content",content);
        axios.post(`/api/story/saveStory`, formData).then(
            res => {
                if(res.data.success){
                    alert('새로운 소식 등록에 성공했습니다')
                    setShowNewForm(false);
                    setContent("");
                } else {
                    alert('소식 등록에 실패했습니다. 다시 시도해주세요')
                }
            }
        );
    }

    const onClickNewButton = () => {
        setShowNewForm(!showNewForm);
        setContent('');

    }

    const resize = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log( e.currentTarget.scrollHeight)
        e.currentTarget.style.height = "90px";
        e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
        setContent(e.target.value);
    }

    useEffect(() => {
        axios.get(`/api/story/getStories/${clubId}`).then(
            res => { 
                if(res.data.success){
                    setStories(res.data.stories);
                }
                else {
                    console.log(res.data.error)
                }
            }
        );
    }, [])

    const storyList = stories.slice(0).reverse().map( story => {
        return(
            <React.Fragment key={story._id}>
                <Col>
                    <StoryWrapper>
                        { story.storyPhotos.length > 0 &&
                            <PhotoSlider story={story} /> }
                        <Content>{story.content.replace(/\n+/g, '\n')} </Content>
                        <Date>{story.date}</Date>
                        <DeleteButton>삭제하기</DeleteButton>
                    </StoryWrapper>
                </Col>
            </React.Fragment>
        )
    })


    return (
        <Root>
            {/* 등록하기 버튼 동아리 관리자에게만 보이도록 수정해야함 */}
            <NewButton onClick={onClickNewButton}>등록하기</NewButton>
            <Row>
                {showNewForm && 
                <Col>
                    <StoryWrapper>
                        <Box>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                            <ThumbsContainer>
                                {thumbs}
                            </ThumbsContainer>
                        </Box>
                        <ContentInput placeholder="새로운 소식을 등록해주세요" value={content} onChange={(e) => resize(e)} />
                        <SumbitButton onClick={saveStory}>등록하기</SumbitButton>
                    </StoryWrapper>
                </Col>
                }
                {storyList}
            </Row>
        </Root>
    )
}


export default StoryList;