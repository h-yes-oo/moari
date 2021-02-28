import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Story } from 'types';
import LeftArrow from 'assets/icons/left-arrow.svg';
import RightArrow from 'assets/icons/right-arrow.svg';
import palette from 'constants/palette';

interface PhotoSliderProps {
    story: Story;
}

interface ImageProp {
    src: string;
}

const Container = styled.div<ImageProp>`
    position: relative;
    width: 100%;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:before {
        content: "";
        float: left;
        padding-top: 100%;
    }
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
`

const LeftButton = styled.button`
    position: absolute;
    left: 20px;
    margin: auto 0;
    top: 0;
    bottom: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 2;
    opacity: 0.5;
    &:focus {
    outline: none;
    }   
    &:hover {
    opacity: 1;
    }
`

const RightButton = styled.button`
    position: absolute;
    right: 20px;
    margin: auto 0;
    top: 0;
    bottom: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 2;
    opacity: 0.5;
    &:focus {
    outline: none;
    }
    &:hover {
        opacity: 1;
    }
`
const SlideNumber = styled.div`
    position: absolute;
    bottom: 20px;
    text-align: center;
    margin-top: 20px;
    font-family: Montserrat;
    font-style: normal;
    font-size: 18px;
    line-height: 24px;
    color: ${palette.primaryViolet.toString()};
    display: flex;
    opacity: 0.5;
`

interface DotProps {
    selected: boolean;
}

const Dot = styled.div<DotProps>`
    width: 8px;
    height: 8px;
    border: 1.5px solid;
    margin: 0 2px;
    border-radius: 50%;
    margin: 0 5px;
    background: ${props => props.selected? palette.primaryViolet.toString() : 'none' };
`

const PhotoSlider: FC<PhotoSliderProps> = ({ story }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = story.storyPhotos.length;

    const nextSlide = () => {
        if (currentSlide >= totalSlides - 1) {
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    };
    const prevSlide = () => {
        if (currentSlide === 0) {
            setCurrentSlide(totalSlides - 1);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const storyImages = 
        story.storyPhotos.map((photo, index) => {
            const bufferArray = photo ? photo.img.data.data : ""; 
            const base64prefix = "data:image/png;base64,"
            const imageSource = photo ? base64prefix + btoa(new TextDecoder('utf-16').decode(new Uint16Array(bufferArray))) : "";
            const slideComponents = totalSlides > 1 ?
                <>
                    <LeftButton onClick={prevSlide}>
                        <img alt="이전 페이지 보기" src={LeftArrow}/> 
                    </LeftButton>
                    <SlideNumber>
                        {story.storyPhotos.map((photo, index2) => {
                            return <Dot key={'dot'+index2} selected={index === index2} />
                        })}
                    </SlideNumber>
                    <RightButton onClick={nextSlide}>
                        <img alt="이전 페이지 보기" src={RightArrow}/> 
                    </RightButton>
                </>
                : null;
            return (
                <Container key={index} src={imageSource} >
                    {slideComponents}      
                </Container>
            )
        })
    return (
        storyImages[currentSlide]
    )
}

export default PhotoSlider
