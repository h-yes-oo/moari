import React, { FC, ReactNode, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules'
import Loading from '../Loading';
import palette from 'constants/palette';
import { useDropzone } from 'react-dropzone';
import PhotoSlider from './PhotoSlider';
import { fetchStories } from 'modules/stories';
import { deleteStory, saveStory } from 'modules/story';
import Plus from 'assets/icons/plus.svg';
import sampleImg from 'assets/samples/likelion.jpg';
import axios from 'axios';
import { Story } from 'types';


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
    cursor: pointer;
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
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
        display: none;
      }
`

const Thumb = styled.div`
    display: inline-flex;
    border-radius: 2px;
    border: 1px solid #eaeaea;
    margin-left: 20px;
    padding: 4px;
    box-sizing: border-box;
    width: 100px;
    min-width: 100px;
    height: 100px;
    justify-content: center;
    overflow: hidden;

`

const Img = styled.img`
    display: block;
`

const DropHere = styled.p`
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
    const [showNewForm, setShowNewForm] = useState<boolean>(false);
    const [content, setContent] = useState<string>('');
    const [refresh, setRefresh] = useState<boolean>(false);
    const [files, setFiles] = useState<(Blob & dropFile)[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStories.request({ clubId }));
    }, [refresh, clubId, dispatch])

    const refreshFunction = () => {
        setRefresh(!refresh);
        setShowNewForm(false);
        dispatch(fetchStories.request({ clubId }));
    }

    const storiesData = useSelector((state: RootState) => state.stories.data);

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
          <Img
            src={file.preview}
            alt={file.name}
          />
      </Thumb>
    ));
  
    useEffect(() => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: dropFile) => URL.revokeObjectURL(file.preview));
    }, [files]);

    const onSaveStory = () => {
        dispatch(saveStory.request({ clubId, content, files }));
        setShowNewForm(false);
        setContent("");
        refreshFunction();
    }

    const onClickNewButton = () => {
        setShowNewForm(!showNewForm);
        setContent('');
    }

    const onDeleteStory = (storyId: string) => {
        dispatch(deleteStory.request({ storyId }));
        refreshFunction();
    }

    const resize = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        e.currentTarget.style.height = "90px";
        e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
        setContent(e.target.value);
    }

    let storyList: ReactNode = <Loading />;

    if(storiesData){
        const stories = storiesData!.stories;
        storyList = stories.slice(0).reverse().map( story => {
            return(
                <React.Fragment key={story._id}>
                    <Col>
                        <StoryWrapper>
                            { story.storyPhotos.length > 0 &&
                                <PhotoSlider story={story} /> }
                            <Content>{story.content.replace(/\n+/g, '\n')} </Content>
                            <Date>{story.date}</Date>
                            <DeleteButton onClick={() => onDeleteStory(story._id)}>삭제하기</DeleteButton>
                        </StoryWrapper>
                    </Col>
                </React.Fragment>
            )
        })
    }


    return (
        <Root>
            {/* 등록하기 버튼 동아리 관리자에게만 보이도록 수정해야함 */}
            <NewButton onClick={onClickNewButton}>등록하기</NewButton>
            <Row>
                {showNewForm && 
                <Col>
                    <StoryWrapper>
                        <Box>
                            <div {...getRootProps()} >
                                <input {...getInputProps()} />
                                <DropHere><img src={Plus}/></DropHere>
                            </div>
                            <ThumbsContainer>
                                {thumbs}
                            </ThumbsContainer>
                        </Box>
                        <ContentInput placeholder="새로운 소식을 등록해주세요" value={content} onChange={(e) => resize(e)} />
                        <SumbitButton onClick={onSaveStory}>등록하기</SumbitButton>
                    </StoryWrapper>
                </Col>
                }
                {storyList}
            </Row>
        </Root>
    )
}


export default StoryList;