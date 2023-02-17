import React from 'react'

interface Props extends React.HTMLAttributes<SVGSVGElement> {
  height?: number
  width?: number
}

function Logo({ height = 40, width = 32, ...rest }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 25916.27 18995.285'
      {...rest}
    >
      <g>
        <path
          fill='#02171B'
          fillRule='evenodd'
          stroke='none'
          d='M221 10780l134 316 1114 977h5175.5l308 136.5 1262.75-18.4 239.75 704.4 671 1247 634 748.5-634 897.5-60 942.5 422.5 887 1040 925.5 598 276.5 843 29.5 798.5-352.5 818.5-815.5L14672 17986l1727.5 228.5h1455l2102.5-533 1844-950.5 192-25 628.5 623 918 395h729l756-395 509.5-623 128-738.5-128-797.5-1034-1215 824.5-1882 454.5-2140-29-1893.5-406.5-1729L24815 5057l-385.5-614 329.5-1669-137.5-636.5-246-333.5-957-851-633-182-1511 406h-335L20150 771l-1498-468.5-1374.5-153h-1232L14536 396l-1578 557-1251 699-1178.5 929-1040 1129.5L8675 5057l-220 224.5H6952.5l-575-530H1942L1790.5 4923l-964 3116.5 90.5 221-202 263-585.5 1683L221 10780z'
        ></path>
        <g>
          <g>
            <g fillRule='evenodd' stroke='none'>
              <path
                fill='#FFF'
                d='M15381.2 15713.8c767.3-321.7 1560.9-763.6 2348.1-1315l71.2 71.2c16 16 32.2 31.6 48.7 46.8l70.8 65.5c-1007.1 710.4-2026.3 1245.7-2992 1584.8l453.2-453.3zm5929-4745.4c208.5-269.4 404.9-540.8 588.8-812.8 536.1-793.12 965.3-1591.09 1278-2361.96 69.8-172.27 133.9-343.12 192-512.24 186.7-153.69 319.4-366.1 378.1-616.25l281.1-1197.3c-57.3 750.75-264.7 1572.17-610 2423.5-319.4 787.63-757.1 1601.77-1303.4 2409.85-192.9 285.3-399.4 570-619.2 852.6l-185.4-185.5v.1zm4546.9-744.8c-113.1 992.7-388 1971-825.1 2891.9-164.4 346.4-351.8 684.6-562.2 1012.5l-188.2-188.3c191.8-303.4 363.6-615.7 515.2-935.1 424.8-894.9 691.9-1845.2 801.7-2809.6 153.7-1349.3-.3-2726.21-460.3-4017.25-150.4-421.96-333.5-834.76-549.2-1234.43 57 173.34 106.8 349.9 149.3 529.34 267.9 1131.13 246.9 2375.68-51.1 3629.83-212.2 893.3-565.8 1792.91-1056.4 2661.01-178.9 316.6-375.9 628.7-590.8 934.7l-186.3-186.4c200-287 383.8-579.4 551.1-875.5 477.3-844.6 821.7-1721.53 1029-2593.89 288.7-1215.3 309.6-2419.03 51.1-3510.73-69.8-294.46-159.9-580.77-270.5-856.99l144.2-614.39c430.9 640.16 772.7 1323 1024.9 2030.93 473.2 1328.09 631.6 2744.43 473.5 4132.27l.1.1zm-3786 6427.4c-1554 1112-3379.9 1681.9-5213 1706.2-1182.4 15.6-2367.7-195.9-3485-635.3l201-200.9c1054.7 399.3 2169.2 591.3 3280.9 576.6 1764.4-23.3 3521.8-567.2 5022.6-1628l8.1 8.2c16.1 16.1 32.4 31.8 49 47.1l136.4 126.1zM9735.69 15116.2c-205.96-242.3-397.35-492.8-574.1-750.4-346.01-504.2-636.24-1035.8-870.52-1585.9-96.3-226.1-183.04-455.3-260.38-687h139.83c44.67 0 87.5-7.6 127.18-21.8 69.93 204.5 147.42 407 232.59 607 106.34 249.7 224.6 495.6 354.78 736.7-10.2-31-20.19-62.1-29.91-93.2-160.54-514.5-257.46-1056.8-292.14-1616.2l113.84-365.6h132.29c9.49 662.7 106.88 1303.6 294.4 1904.4 110.63 354.5 252.33 694.6 425.44 1016.5-26.29-117.5-47.31-238.4-63.17-362.3-81.75-639.2-24.01-1358.8 162.88-2124.4l115.24 106.6c6.57 6 13.29 12 20.18 17.8 27.54 23.4 56.79 43.9 87.35 62-156 687.5-201.45 1331.9-128.1 1905.4 44.52 348.2 133.47 670.6 268.67 960.9 3.5 7.6 7.07 15.1 10.66 22.5l-266.99 267h-.02zM8373.81 5389.77c427.42-943.52 1022.93-1830.21 1787.29-2615.05 1149.5-1180.27 2539.4-1985.126 4016.8-2412.452 1530.5-442.723 3154.9-480.063 4702.9-109.81 790.7 189.118 1560.7 484.043 2287.4 885.032 70.2 38.78 140.1 78.56 209.6 119.33l-710 203.73c-347.5-102.83-707.9-175.37-1077.6-218.12-1284.9-148.5-2681.7 63.43-4044 615.07-1318.3 533.8-2603.4 1385.17-3723.5 2535.27-318.7 327.28-612.9 667.25-882.2 1016.82-104-12.61-210.2-16.33-313.7-16.35 304.2-407.63 640.8-803.02 1009.6-1181.66 1146.5-1177.2 2462.2-2048.71 3812.1-2595.32 1402.6-567.98 2843.3-785.881 4171.2-632.38 392.4 45.35 775.1 123.24 1144.4 234.16-624.2-316.009-1276.8-553.678-1943.4-713.112-1504.3-359.812-3083-323.497-4570.5 106.782-1435.2 415.13-2785.7 1197.21-3902.8 2344.22-713.72 732.87-1276 1557.07-1687.37 2433.85h-286.22v-.01zM20163.8 15572.9c-1375.3 963.5-2876.1 1560.6-4332.6 1767.2-715.7 101.6-1420.8 108.8-2095.4 19.2l234.4-234.4c590.3 60.6 1203.5 45.9 1825.3-42.3 1278.9-181.4 2594-673.2 3823.8-1457.9 182.2 11.5 366.2-5.7 544.5-51.8zM14464.9 4617.75c774.4-653.28 1570.9-1204.08 2357.9-1642.08 511.1-284.5 1018.5-521.53 1513.6-708.35-109.7 106.49-196.7 235.55-255.8 381.8-372.2 156.61-750.6 341.53-1131.6 553.57-745.8 415.07-1500.7 933.75-2237 1546.92-78.9-50.79-161.6-94.85-247.1-131.86zM10201.2 14650.7c6.2-23.9 12.8-48 19.7-72.3 183.7-644.5 631.5-1501.7 1288.5-2482.1h171.6c47.8 0 95.7-.8 143.7-2.9-558.6 817.8-972.9 1550-1210.7 2144.4l-412.8 412.8v.1z'
              ></path>
              <path
                fill='#FFF'
                d='M362.074 11254.2c-15.459-14.5-30.405-29.3-44.496-43.9-.83-.9-1.636-1.7-2.466-2.6-308.833-322.3-391.914-773-243.69-1192.4l487.659-1379.75c51.578-145.89 128.554-280.95 224.847-401.14-63.263-132.52-73.985-281.65-28.756-426.92l877.438-2818.07c77.69-249.51 302.89-415.28 564.24-415.28h1880.47c161.02 0 324.54 13.05 480.37 55.44 36.43 9.91 72.39 21.47 107.67 34.84 92.62-57.32 200.45-87.97 312.42-87.97h1145.29c147.63 0 285.68 51.53 395.04 150.68.55.49 1.11.97 1.66 1.48.61.56 1.14 1.05 1.77 1.62l473.6 437.95h196.53c67.22 0 132.89 10.57 195.14 32 62.3-21.32 128.03-32 194.71-32h1079.33c92.64 0 182.52 20.41 263.78 60.65 38.57-9.34 77.51-17.21 116.62-23.72 152.46-25.38 307.49-33.46 461.88-33.46h1122.17c152.5 0 306.4 7.47 456.6 35.45 64.5 12.03 128.3 28.55 190 50.63 42.6-22.71 87.8-40 134.7-51.66l68.2-217.65c78-249.02 303-414.28 563.9-414.28h990.7c85.6-154.06 234.7-260.77 415.1-291.77 562.1-96.62 1138.6 55.44 1577.4 420.12 3.1 2.58 6.2 5.23 9.3 7.83 11 9.3 22 18.68 32.8 28.2 5.6 4.91 11.1 9.93 16.7 14.91 6.1 5.51 12.3 10.95 18.4 16.57l707.9 654.64c18.6 17.19 36.9 34.74 54.8 52.65l431 431.02 1865.9-1865.92c-326.3-339.13-457.9-806.67-349.2-1269.41 114.2-486.67 466.7-856.74 947.2-994.62l3636-1043.305c428.9-123.084 877.5-35.546 1228.2 239.916 1.1.892 2.2 1.77 3.3 2.649 9.9 7.767 19.6 15.679 29.2 23.69 3.1 2.53 6.1 5.07 9.1 7.62 7.7 6.53 15.3 13.15 22.9 19.83 4.6 4.01 9 8.07 13.6 12.14 3.4 3.09 6.9 6.13 10.3 9.28l707.9 654.64c5.2 4.81 10.4 9.67 15.6 14.56 359.2 342.04 508 830.85 394.5 1314.38l-864.4 3682.08c-114.3 486.67-466.8 856.74-947.3 994.64-130.9 37.54-266.4 55.95-401.9 54.26 5.9 519.59-195.2 1027.65-568.3 1400.75L20933 10277.8l4257.7 4257.7c758.1 758 758.1 1995.6 0 2753.6-736.9 737-1933.5 760.5-2698.5 53.2l-708-654.7c-18.7-17.3-37.1-35-55.2-53.1l-1038-1038c-727.3 412.5-1661 314.1-2284.4-262.3l-707.9-654.6c-18.6-17.2-37-34.8-55-52.8l-431-431-4231 4231c-736.9 736.9-1933.5 760.4-2698.4 53.1l-707.98-654.7c-18.75-17.3-37.15-35-55.23-53.1-758.06-758.1-758.09-1995.6-.02-2753.7l2764.83-2764.7c-46.4 12-93.4 21.9-140.6 29.9-152.8 25.9-308.4 34.4-463.3 34.4h-1122.1c-153.2 0-307.8-7.8-458.6-36.3-175.31-33.2-342-97.8-479.41-214.1-9.31-7.9-18.48-16-27.43-24.3l-521.16-481.9h-232.37l-105.17 337.8c-77.68 249.5-302.91 415.3-564.25 415.3H7020.02c-149.22 0-288.85-52.4-398.47-153.8l-9.65-8.9c-152.66 53.3-313.67 82.3-475.63 82.3H1919.39c-312.78 0-615.51-108.9-846.2-322.3l-705.744-652.6c-1.832-1.6-3.614-3.3-5.397-5h.025zm153.22-160.1c-.183-.2-.378-.4-.561-.6-13.09-12.1-25.741-24.7-38.061-37.5-.513-.5-1.025-1-1.526-1.6-229.988-240-325.452-595.4-194.761-965.2l487.658-1379.78c61.31-173.5 165.944-328.72 298.457-456.42-15.96-15.29-30.82-32.28-44.54-50.9-71.88-97.65-91.221-212.95-55.188-328.73L1844.21 5055.3c48.85-156.92 188.31-259.55 352.65-259.55h1880.47c140.25 0 286.45 10.73 422.21 47.66 69.97 19.04 137.24 45.37 199.35 80.47 68.05-78.91 167.79-125.82 278.91-125.82h1145.28c95.11 0 179.79 32.47 246.57 93.58l.49.45c.32.29.64.57.94.85l537.32 496.85h283.29c72.04 0 137.61 18.41 194.58 54.23 56.74-35.1 123.48-54.23 195.27-54.23h1079.32c87.04 0 166.04 27.57 229.54 78.55 61.17-19.5 123.98-34.08 187.26-44.62 139.81-23.27 283.89-30.45 425.48-30.45h1122.16c137.7 0 280.4 6.45 416 31.7 89.2 16.63 176.5 43.41 256.3 85.05 66.4-63.21 155.9-99.98 254.3-99.98h23.1l111.3-355.35c49-156.6 188.3-258.92 352.4-258.92h1140.7l12-39.1c41.8-136.64 149.8-231.68 290.6-255.88 500.5-85.98 1011 50.29 1398.3 372.16 2.7 2.3 5.4 4.65 8.2 6.96 9.8 8.29 19.6 16.66 29.3 25.17 5 4.37 9.9 8.85 14.8 13.28 5.3 4.79 10.7 9.5 16 14.39l708 654.62c16.4 15.21 32.6 30.75 48.5 46.66l587.7 587.73L18475 4039.51l-118.2-112.59c-302.7-288.21-427.2-695.86-331.6-1103.24 95.9-408.57 389.2-716.52 792.6-832.26l3636-1043.321c363.9-104.413 738.2-28.17 1030.2 201.181.9.72 1.8 1.46 2.8 2.2 8.4 6.63 16.7 13.42 25 20.28 2.5 2.08 4.9 4.18 7.4 6.28 6.6 5.6 13.2 11.32 19.7 17.08 4 3.48 7.9 7.05 11.9 10.58 2.6 2.4 5.4 4.76 8 7.21l708 654.64c4.4 4.09 8.8 8.21 13.1 12.36 302.7 288.22 427.2 695.87 331.6 1103.24l-864.4 3682.07c-95.9 408.57-389.2 716.53-792.6 832.27-196.5 56.39-396 60.14-584 15.57 84.8 530.5-78 1091.94-481.8 1495.77l-1269.1 1269.07 4414.4 4414.3c671.6 671.6 671.6 1768.7 0 2440.3-655.5 655.5-1716.4 671.2-2391.3 47.1l-708-654.6c-16.5-15.4-32.9-31.1-48.9-47.1l-1163.3-1163.3c-660.5 465.4-1568.7 408.7-2165.4-143l-707.9-654.7c-16.5-15.2-32.7-30.8-48.7-46.8l-587.7-587.7-4387.8 4387.7c-655.4 655.5-1716.3 671.2-2391.2 47.1l-707.98-654.7c-16.57-15.3-32.88-31-48.97-47.1-671.59-671.5-671.63-1768.7-.04-2440.2l3082.29-3082.3H12614c-95.8 0-181-32.9-248-94.9l-2.4-2.1c-82.5 32.2-168.8 54.4-256.3 69.3-140 23.7-284.4 31.2-426.2 31.2H10559c-138.3 0-281.4-6.7-417.4-32.5-136.8-25.8-269.97-74.5-377.46-165.4-6.89-5.8-13.61-11.8-20.18-17.9L9159 11339.7c-8.01.1-16.01.1-23.98.1h-458.13l-153.68 493.6c-48.85 156.9-188.31 259.5-352.65 259.5H7020.07c-95.79 0-181-32.9-248-94.8l-112.78-104.3c-164.22 76.2-343.4 118.7-522.95 118.7H1919.45c-276.15 0-519.41-100.3-695.72-263.3l-707.967-654.7c-.147-.1-.282-.2-.415-.4h-.054z'
              ></path>
              <g transform='translate(591.68 1271.197)'>
                <path
                  fill='#0073BA'
                  d='M19282.1 13032.8c-531.3 430.1-1318.7 398.4-1812.2-95.1l-1530.2-1530.2-4675.5 4675.5c-527.4 527.4-1390.46 527.4-1917.89 0-527.45-527.5-527.44-1390.5-.03-1918l4042.12-4042c412.5 399.9 974.9 646.2 1594.8 646.2 567.6 0 1087-206.4 1487.2-548.2l4.1 4.2 2807.6 2807.6z'
                ></path>
                <path
                  fill='#2BA9CD'
                  d='M20394.7 4975.74c459.5 531.2 437.3 1341.91-66.9 1846.02l-1530.1 1530.2 4675.5 4675.54c527.4 527.4 527.4 1390.5 0 1917.9-527.5 527.4-1390.6 527.4-1918 0l-4674.1-4674.1 639.3-1999.09h131.1c113.4 0 209.6-70.85 243.4-179.15l261.2-878.76 2238.5-2238.56h.1z'
                ></path>
                <path
                  fill='#24C87C'
                  d='M13066 6726.99l-827.6-827.66 221.9-712.84h131.1c113.4 0 209.7-70.84 243.4-179.15l131.9-423.41c24.9-79.91 11.5-159.47-38.1-226.88-44.1-59.98-106-95.4-178.1-102.49l202.4-660.98c420.3-72.21 868.7 53.07 1191.4 375.76l1530.2 1530.19L20350 824.016c527.4-527.429 1390.5-527.429 1917.9 0 527.5 527.454 527.4 1390.544 0 1917.944l-3983.5 3983.48-1821.3 2.86c-399.2-338.13-915.7-542.1-1479.9-542.1-563.6 0-1079.7 203.56-1478.8 541.1l-438.4-.31z'
                ></path>
                <path
                  fill='#FFF'
                  d='M2712.75 4529.58h-155.03l-246.36 791.28h149.8c57.27 0 103.02-15.04 137.45-45.69 34.8-30.07 63.16-82.13 86.23-156.17l119.93-385.24c23.07-74.03 27.29-126.67 12.72-157.91-14.56-31.22-49.23-46.26-104.74-46.26v-.01zM727.736 6711.97L1605.16 3893.9h1880.47c131.88 0 240.48 11.58 325.25 34.7 85.33 23.14 149.96 58.99 193.25 107.58 43.87 48.6 67.05 111.64 69.52 189.14 2.65 76.95-12.28 169.5-45.41 275.93l-241.89 776.82c-79.41 255.08-189.5 432.08-329.19 531.56-136.27 99.5-340.88 149.23-614.49 149.23h-729.96l-234.51 753.1H727.723l.013.01zM3509.37 6711.97l692.84-2225.19H5347.5l-692.85 2225.19H3509.37zm727.78-2337.41l148.94-478.35h1145.29l-148.94 478.35H4237.15z'
                ></path>
                <path
                  fill='#FFF'
                  d='M6913.39 6711.97H5292.66l223.94-2224.03h1083.39l-197.26 1254.01 587.13-1254.01h1079.32L6913.39 6711.97z'
                ></path>
                <path
                  fill='#FFF'
                  d='M9126.48 5090.08L8805.9 6119.66c-35.11 112.8.47 169.47 106.3 169.47 56.12 0 100.75-13.29 133.9-39.9 33.73-26.61 59.78-69.41 78.52-129.57l320.57-1029.58c35.12-112.8-.45-169.49-106.88-169.49-54.94 0-99.57 13.32-133.31 39.91-33.74 26.62-59.97 70-78.52 129.58zm-1130.76-93.13c29.55-94.86 67.14-174.68 113.92-239.46 46.58-64.22 105.6-116.28 176.84-155.6 70.67-39.33 157.58-67.69 260.15-85.02 102.41-16.79 223.69-25.46 364.82-25.46h1122.15c141.1 0 257 8.67 348.4 25.46 91.7 17.35 161.4 46.27 209 86.74 47.3 41.08 74.3 93.72 80.2 158.49 6.6 64.22-4.6 142.87-33.2 234.85l-377.5 1212.38c-29.5 94.85-67.5 174.11-113.9 237.74-45.9 63.62-105.5 115.68-178.24 156.17-72.76 40.48-160.24 68.83-262.84 86.17-101.99 17.37-223.27 26.04-364.4 26.04H8219c-141.15 0-257.01-8.67-348.8-26.04-91.75-17.35-161.22-45.12-207.38-84.43-46.74-39.33-73.36-91.4-79.78-156.18-6.44-64.79 5.68-144.61 35.21-239.47l377.47-1212.38z'
                ></path>
                <path
                  fill='#FFF'
                  d='M11176.5 4508.17l192.4-614.28h1148.8l-191.3 614.28h318.7l-131.8 423.41h-318.7l-715.1 2380.32h-1149.9l715.1-2380.32 131.8-423.41z'
                ></path>
                <path
                  fill='#FFF'
                  d='M7705.4 7615.27h-155.02l-246.37 791.29h149.8c57.27 0 103.02-15.04 137.45-45.69 34.8-30.08 63.16-82.13 86.2-156.17l119.96-385.24c23.06-74.03 27.29-126.67 12.73-157.91-14.57-31.22-49.23-46.26-104.75-46.26v-.02zm-1985.01 2182.4l877.43-2818.07h1880.46c131.89 0 240.49 11.56 325.25 34.7 85.33 23.14 149.95 58.99 193.24 107.58 43.87 48.6 67.06 111.63 69.52 189.14 2.67 76.95-12.28 169.5-45.41 275.93L8779 8363.76c-79.43 255.09-189.5 432.08-329.2 531.57-136.26 99.48-340.88 149.23-614.49 149.23h-729.98l-234.48 753.11H5720.38h.01zM10166.8 8175.77l-320.59 1029.59c-35.12 112.8.43 169.47 106.28 169.47 56.11 0 100.71-13.3 133.91-39.9 33.7-26.61 59.8-69.41 78.5-129.57l320.6-1029.59c35.1-112.79-.5-169.48-106.9-169.48-54.9 0-99.6 13.31-133.3 39.91-33.7 26.62-60 69.99-78.5 129.57zm-1130.77-93.13c29.52-94.85 67.12-174.67 113.89-239.46 46.58-64.21 105.62-116.27 176.85-155.59 70.67-39.33 157.6-67.69 260.15-85.03 102.41-16.79 223.69-25.45 364.83-25.45h1122.15c141.1 0 257 8.66 348.3 25.45 91.8 17.36 161.5 46.27 209 86.75 47.4 41.08 74.4 93.72 80.3 158.49 6.6 64.22-4.6 142.87-33.2 234.84l-377.5 1212.37c-29.5 94.87-67.5 174.13-113.9 237.76-45.9 63.62-105.5 115.68-178.2 156.17-72.8 40.48-160.3 68.84-262.9 86.18-102 17.36-223.3 26.03-364.4 26.03H9259.29c-141.13 0-257-8.67-348.79-26.03-91.78-17.36-161.23-45.12-207.4-84.45-46.74-39.32-73.35-91.39-79.77-156.18-6.44-64.78 5.68-144.6 35.2-239.47l377.5-1212.38zM11314.3 9797.66l692.9-2225.18h1145.2l-692.8 2225.18h-1145.3zm727.8-2337.41l148.9-478.34h1145.3l-148.9 478.34h-1145.3zM12629.1 9797.66l692.3-2223.45h1823.7c261.9-8.68 442.3 41.64 542.3 151.55 100 109.89 117.3 269.54 51.8 480.09l-495.6 1591.82h-1148.2l483.9-1554.24c35.1-112.78-.6-168.9-106.5-168.9-55.5 0-100 12.74-133.7 39.33-33.7 26.61-60 70.01-78.5 129.57l-483.9 1554.24h-1147.6v-.01z'
                ></path>
                <path
                  fill='#FFF'
                  d='M16213.3 7593.87l192.5-614.27h1148.7l-191.3 614.27h318.8l-131.9 423.4h-318.7l-554.3 1780.4h-1149.9l554.3-1780.4 131.8-423.4z'
                ></path>
                <path
                  fill='#24C87C'
                  d='M22952.3 972.85l-864.4 3682.07c-65.4 278.34-260.1 482.78-534.9 561.68-274.9 78.87-552.1 9.84-761.6-189.66l-2771.6-2638.76c-209.5-199.48-292-472.96-226.7-751.31 65.4-278.35 260.1-482.8 534.9-561.67L21964 31.882c274.8-78.868 552.1-9.84 761.6 189.657 209.5 199.474 292 472.956 226.7 751.311z'
                ></path>
                <path
                  fill='#FFF'
                  d='M1361.65 6983.51h4216.89c454.17 0 722.17 381.92 582.82 776.19l-487.65 1379.76c-113.67 321.64-470.18 577.78-837.07 577.78H619.759c-454.165 0-722.164-381.92-582.816-776.18L524.59 7561.29c113.669-321.63 470.184-577.79 837.071-577.79l-.01.01zm0 317.33h4216.89c212.43 0 329.05 161.85 259.12 359.65L5350 9040.26c-69.92 197.8-300.92 359.64-513.36 359.64H619.758c-212.428 0-329.028-161.84-259.11-359.64l487.658-1379.77c69.93-197.8 300.904-359.65 513.344-359.65z'
                ></path>
                <path
                  fill='#FFF'
                  d='M1648.73 7961.98l-68.48 201.75h58.91c27.87 0 50.43-7.62 67.26-22.82 17.06-15.22 31.46-40.93 43.75-77.2 13.12-38.58 16.75-65.2 10.88-79.83-5.86-14.61-23.67-21.92-53.41-21.92h-58.91v.02zm-262.57 773.61h58.94c29.71 0 52.51-7.31 68.27-21.94 15.8-14.62 30.1-40.91 43.21-79.53l19.87-58.48c12.67-37.4 16.13-63.42 10.48-78.63-5.67-15.22-23.4-22.82-53.13-22.82h-58.91l-88.72 261.38-.01.02zm-645.824 326.3l483.474-1424.44h866.53c62.45 0 113.8 6.44 153.51 19.31 39.97 12.87 69.19 32.75 87.62 59.63 18.34 27.22 26.73 62.29 24.73 105.55-1.71 43.29-12.69 94.73-32.92 154.37-32.05 94.44-73.68 166.94-125.1 217.23-51.14 50.29-120.56 85.95-207.72 107.01 71.12 19.89 113.92 60.23 128.71 121.03 14.77 60.83 1.39 152.05-39.9 273.67-45.63 134.5-103.99 229.21-174.84 284.18-70.82 54.96-170.19 82.46-297.55 82.46H740.336zm1972.864.87l61.7-606.37-205.78 606.37h-535.08l483.44-1424.42h673.5l-19.77 570.41 367.19-570.41h674.83l-483.45 1424.42h-536.12l205.8-606.37-348.85 606.37H2713.2zm1436.54.58c-112.67-.29-190.38-22.23-232.63-66.65-42.3-44.16-44.98-117.56-8-220.16l84.75-249.68h556.94l-32.83 96.77c-22.33 65.77-11 98.52 33.88 98.52 23.8 0 43.87-8.2 60.5-24.57 16.66-16.37 31.65-43.85 44.75-82.43 7.26-21.36 12.24-39.19 14.83-53.22 2.61-14.03 2.45-26.31-.58-36.54-2.93-10.52-9.03-19.58-18.87-27.2-9.5-7.89-23.33-15.78-41.08-23.98l-326.15-151.14c-75.68-35.08-121.93-72.51-138.42-112.28-16.47-41.5-12.75-97.06 10.69-166.05l50.29-148.24c28.78-84.77 79.16-148.81 151.27-192.37 72.09-43.55 164.42-65.49 277.18-65.49h560.47c113.01 0 190.74 21.94 232.99 65.49 42.56 43.56 49.2 107.6 20.43 192.37l-55.36 163.15h-553.18l5.67-16.67c21.24-62.57 8.34-93.85-38.99-93.85-19.48 0-37.6 6.43-53.51 19.01-16.16 12.57-27.65 28.93-34.51 49.12-3.48 10.24-5.72 19.3-5.94 26.32-.6 7.3 1.63 14.33 6.02 21.33 4.75 6.73 12.24 14.05 22.49 21.36 9.84 7.62 24.48 15.5 43.3 24.56l377.02 183.62c23.43 12.27 42.16 26.32 56.27 42.1 13.75 16.08 23 35.07 27.69 57.88 4.4 22.81 4.11 49.99-1.48 81.58-5.39 31.85-15.57 69-30.26 112.27l-51.88 152.9c-42.79 120.47-99.65 204.36-169.98 251.42-70.32 47.08-164.78 70.49-283.59 70.78h-560.17l-.02-.03z'
                ></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default Logo
