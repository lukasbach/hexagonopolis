import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {useEffect, useRef, useState} from "react";
import Color from "color";
import {HexagonPositioningService} from "../../utils/HexagonPositioningService";

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  innerContainer: {
    width: `${window.innerWidth * 4}px`,
    height: `${window.innerHeight * 4}px`,
  }
});

export const TileBoardContainer: React.FC<{
  isDragging?: (isDragging: boolean) => void;
  backgroundColor?: string;
  initialCentering?: [number, number];
}> = props => {
  const backgroundColor = props.backgroundColor || '#eee';

  useEffect(() => {
    if (props.initialCentering && containerRef.current) {
      const [xPos, yPos] = HexagonPositioningService.getTilePositioning(props.initialCentering[0], props.initialCentering[1]);
      console.log(`Center on coords ${props.initialCentering}, position ${xPos}:${yPos}`);
      containerRef.current.scrollTo(
        xPos + 800 - containerRef.current.offsetWidth / 2,
        yPos + 800 - containerRef.current.offsetHeight / 2,
      )
    }
  }, []);

  const onDrag = (x: number, y: number) => {
    if (containerRef.current && dragStart) {
      containerRef.current.scrollTo(
        oldScroll[0] + dragStart[0] - x,
        oldScroll[1] + dragStart[1] - y,
      )
    }
  };

  const [dragStart, setDragStart] = useState<null | [number, number]>(null);
  const [oldScroll, setOldScroll] = useState<[number, number]>([0, 0]);

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={css(styles.container)}
      style={{
        background: `linear-gradient(350deg, ${Color(backgroundColor).darken(.1).string()} 0%,`
          + ` ${Color(backgroundColor).darken(-.2).string()} 100%)`,
        backgroundColor
      }}
      onMouseDown={e => {
        if (e.button === 2) {
          setOldScroll([containerRef.current!.scrollLeft, containerRef.current!.scrollTop])
          setDragStart([e.clientX, e.clientY]);
          if (props.isDragging) {
            props.isDragging(true);
          }
        }
      }}
      onMouseUp={e => {
        if (e.button === 2) {
          setDragStart(null);
          if (props.isDragging) {
            props.isDragging(false);
          }
        }
      }}
      onMouseMove={e => !!dragStart && onDrag(e.clientX, e.clientY)}
      onContextMenu={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
      ref={containerRef}
    >
      <div className={css(styles.innerContainer)}>
        {props.children}
      </div>
    </div>
  )
};
