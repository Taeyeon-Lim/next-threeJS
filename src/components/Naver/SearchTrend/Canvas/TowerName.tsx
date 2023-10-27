import { Html } from '@react-three/drei';

import { a, useTrail, easings } from '@react-spring/web';

import { HtmlProps } from '@react-three/drei/web/Html';

import styles from './towerName.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function TowerName({
  towerType,
  towerKeyword,
  visible,
  ...props
}: {
  towerType: 'alpha' | 'beta';
  towerKeyword: string;
} & HtmlProps) {
  const trails = useTrail(towerKeyword.length, {
    from: {
      opacity: 0,
    },
    opacity: visible ? 1 : 0,
    config: {
      easing: easings.steps(towerKeyword.length * 2),
      duration: 100,
      precision: 0.0001,
    },
  });

  return (
    <Html {...props} transform occlude>
      <div className={cx('towerName-animation_wrapper', towerType)}>
        {trails.map((style, index) => {
          return (
            <a.div key={index} style={style}>
              {towerKeyword[index]}
            </a.div>
          );
        })}
      </div>
    </Html>
  );
}

export default TowerName;

//   <Text
//     font={'/fonts/NanumGothic-Regular.woff'}
//     color='blue'
//     anchorX='center'
//     anchorY='middle'
//     fontSize={2}
//     position={position}
//     rotation={rotation}
//     visible={!!towerKeyword}
//   >
//     {towerKeyword || 'Load..'}
//   </Text>
