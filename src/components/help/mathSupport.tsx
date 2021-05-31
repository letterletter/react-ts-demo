import React from 'react'

export default function JSMathList() {
  return (
    <div>
      <table className="table table-bordered table-hover" >
        <tbody></tbody><thead><tr>
          <th >方法</th>
          <th >描述</th>
          <th >示例</th>
        </tr></thead>
        <tbody>
          <tr>
          <td>abs(x)</td>
          <td>返回数的绝对值。</td>
          <td width="15%" >Math.abs(-10)</td>
          <td width="38%" >//返回10</td>
        </tr>

          <tr>
            <td>acos(x)</td>
            <td>返回数的反余弦值。</td>
            <td >Math.acos(1)</td>
            <td >//返回0</td>
          </tr>

          <tr>
            <td>asin(x)</td>
            <td>返回数的反正弦值。</td>
            <td>Math.asin(1)</td>
            <td >//返回1.5707963267948965</td>
          </tr>

          <tr>
            <td>atan(x)</td>
            <td>以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。</td>
            <td >Math.atan(0.50)</td>
            <td >//返回0.4636476090008061</td>
          </tr>

          <tr>
            <td>atan2(y,x)</td>
            <td>返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。</td>
            <td >Math.atan2(5,5)</td>
            <td >//输出0.7853981633974483</td>
          </tr>

          <tr>
            <td>ceil(x)</td>
            <td>对数进行上舍入。</td>
            <td ><p>Math.ceil(0.60)<br />
              Math.ceil(-5.1)&nbsp;</p></td>
              <td>//返回1<br />//返回-5</td>
          </tr>

              <tr>
                <td>cos(x)</td>
                <td>返回数的余弦。</td>
                <td>Math.cos(0)</td>
                <td >//返回1</td>
              </tr>

              <tr>
                <td>exp(x)</td>
                <td>返回 e 的指数。</td>
                <td >Math.exp(5)</td>
                <td >//返回148.4131591025766</td>
              </tr>

              <tr>
                <td>floor(x)</td>
                <td>对数进行下舍入。</td>
                <td>Math.floor(0.60)<br />
                  Math.floor(-5.1)</td>
                  <td >//返回0<br />//返回-6</td>
              </tr>

                  <tr>
                    <td>log(x)</td>
                    <td>返回数的自然对数（底为e）。</td>
                    <td >Math.log(1)</td>
                    <td>//返回0</td>
                  </tr>

                  <tr>
                    <td>max(x,y)</td>
                    <td>返回 x 和 y 中的最高值。</td>
                    <td >Math.max(5,7)</td>
                    <td >//返回7</td>
                  </tr>

                  <tr>
                    <td>min(x,y)</td>
                    <td>返回 x 和 y 中的最低值。</td>
                    <td>Math.min(5,7)</td>
                    <td >//返回5</td>
                  </tr>

                  <tr>
                    <td>pow(x,y)</td>
                    <td>返回 x 的 y 次幂。</td>
                    <td>Math.pow(2,4)</td>
                    <td >//返回16</td>
                  </tr>

                  <tr>
                    <td>random()</td>
                    <td>返回 0 ~ 1 之间的随机数。</td>
                    <td>Math.random()</td>
                    <td >//返回类似0.6654807284142312的随机数</td>
                  </tr>

                  <tr>
                    <td>round(x)</td>
                    <td>把数四舍五入为最接近的整数。</td>
                    <td>Math.round(0.60)<br />
                      Math.round(-4.40)</td>
                      <td >//返回1<br />//返回-4</td>
                  </tr>

                      <tr>
                        <td>sin(x)</td>
                        <td>返回数的正弦。</td>
                        <td>Math.sin(0)</td>
                        <td >//返回0</td>
                      </tr>

                      <tr>
                        <td>sqrt(x)</td>
                        <td>返回数的平方根。</td>
                        <td>Math.sqrt(0.64)</td>
                        <td >//返回0.8</td>
                      </tr>

                      <tr>
                        <td>tan(x)</td>
                        <td>返回角的正切。</td>
                        <td>Math.tan(10)</td>
                        <td >//返回0.6483608274590866</td>
                      </tr>
                  </tbody>
                </table>
    </div>
  );
}