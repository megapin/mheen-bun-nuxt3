<script setup lang="ts">
// 테이블 데이터 구조
const tableData1 = ref([
  // 1-2행
  {
    col1: '1열 내용 (12개 행 병합)',
    col2: '2열 (1-2행)',
    col3: '3열 (1행)',
    col4: '4열 (1행)',
    col5: '5열 (1행)'
  },
  {
    // col1, col2는 병합되어 있으므로 반복하지 않음
    col3: '3열 (2행)',
    col4: '4열 (2행)',
    col5: '5열 (2행)'
  },
  
  // 3-4행
  {
    col2: '2열 (3-4행)',
    col3: '3열 (3행)',
    col4: '4열 (3행)',
    col5: '5열 (3행)'
  },
  {
    col3: '3열 (4행)',
    col4: '4열 (4행)',
    col5: '5열 (4행)'
  },
  
  // 5-6행
  {
    col2: '2열 (5-6행)',
    col3: '3열 (5행)',
    col4: '4열 (5행)',
    col5: '5열 (5행)'
  },
  {
    col3: '3열 (6행)',
    col4: '4열 (6행)',
    col5: '5열 (6행)'
  },
  
  // 7-8행
  {
    col2: '2열 (7-8행)',
    col3: '3열 (7행)',
    col4: '4열 (7행)',
    col5: '5열 (7행)'
  },
  {
    col3: '3열 (8행)',
    col4: '4열 (8행)',
    col5: '5열 (8행)'
  },
  
  // 9-10행
  {
    col2: '2열 (9-10행)',
    col3: '3열 (9행)',
    col4: '4열 (9행)',
    col5: '5열 (9행)'
  },
  {
    col3: '3열 (10행)',
    col4: '4열 (10행)',
    col5: '5열 (10행)'
  },
  
  // 11-12행
  {
    col2: '2열 (11-12행)',
    col3: '3열 (11행)',
    col4: '4열 (11행)',
    col5: '5열 (11행)'
  },
  {
    col3: '3열 (12행)',
    col4: '4열 (12행)',
    col5: '5열 (12행)'
  }
])

// 실제 애플리케이션에서의 데이터 예시
const realData = ref({
  // 1열에 들어갈 내용 (1개 항목만 필요)
  column1: "프로그램",

  // 2열 내용 (6개 항목 필요)
  column2: [
    "카테고리 1",
    "카테고리 2",
    "카테고리 3",
    "카테고리 4",
    "카테고리 5",
    "카테고리 6"
  ],

  // 3~5열 내용 (12개 항목씩 필요)
  rows: [
    { col3: "건건", col4: "데이터 1-1", col5: "결과 1-1" },
    { col3: "시간", col4: "데이터 1-2", col5: "결과 1-2" },
    { col3: "건건", col4: "데이터 2-1", col5: "결과 2-1" },
    { col3: "시간", col4: "데이터 2-2", col5: "결과 2-2" },
    { col3: "건건", col4: "데이터 2-1", col5: "결과 3-1" },
    { col3: "시간", col4: "데이터 2-2", col5: "결과 3-2" },
    { col3: "건건", col4: "데이터 4-1", col5: "결과 4-1" },
    { col3: "시간", col4: "데이터 4-2", col5: "결과 4-2" },
    { col3: "건건", col4: "데이터 5-1", col5: "결과 5-1" },
    { col3: "시간", col4: "데이터 5-2", col5: "결과 5-2" },
    { col3: "건건", col4: "데이터 6-1", col5: "결과 6-1" },
    { col3: "시간", col4: "데이터 6-2", col5: "결과 6-2" },
  ]
});

// 그런 다음 computed 속성을 통해 테이블 데이터로 변환할 수 있습니다
const tableData = computed(() => {
  return realData.value.rows.map((row, index) => {
    return {
      col1: index === 0 ? realData.value.column1 : null,
      col2: index % 2 === 0 ? realData.value.column2[Math.floor(index/2)] : null,
      col3: row.col3,
      col4: row.col4,
      col5: row.col5
    };
  });
});

const data = [
  { group_name: 'a', type: 'aa', code: "시간", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'a', type: 'aa', code: "건건", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'a', type: 'ab', code: "시간", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'a', type: 'ab', code: "건건", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'a', type: 'ac', code: "시간", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'a', type: 'ac', code: "건건", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'a', type: 'ad', code: "시간", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'a', type: 'ad', code: "건건", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'a', type: 'ae', code: "시간", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'a', type: 'ae', code: "건건", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'a', type: 'af', code: "시간", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'a', type: 'af', code: "건건", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'm', type: 'ma', code: "시간", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'm', type: 'ma', code: "건건", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'm', type: 'mb', code: "시간", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'm', type: 'mb', code: "건건", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'm', type: 'mc', code: "시간", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'm', type: 'mc', code: "건건", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'm', type: 'md', code: "시간", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'm', type: 'md', code: "건건", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'm', type: 'me', code: "시간", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'm', type: 'me', code: "건건", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'm', type: 'mf', code: "시간", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },
  { group_name: 'm', type: 'mf', code: "건건", values: Array(12).fill(0).map((_, i) => Math.floor(Math.random()*100)) },

  // { group_name: 'a', type: 'aa', code: "건건", col4: "데이터 1-1", col5: "결과 1-1" },
  // { group_name: 'b', type: 'aa', code: "시간", col4: "데이터 1-2", col5: "결과 1-2" },
  // { group_name: 'c', type: 'bb', code: "건건", col4: "데이터 2-1", col5: "결과 2-1" },
  // { group_name: 'd', type: 'bb', code: "시간", col4: "데이터 2-2", col5: "결과 2-2" },
  // { group_name: 'e', type: 'cc', code: "건건", col4: "데이터 2-1", col5: "결과 3-1" },
  // { group_name: 'f', type: 'cc', code: "시간", col4: "데이터 2-2", col5: "결과 3-2" },
  // { group_name: 'g', type: 'dd', code: "건건", col4: "데이터 4-1", col5: "결과 4-1" },
  // { group_name: 'h', type: 'dd', code: "시간", col4: "데이터 4-2", col5: "결과 4-2" },
  // { group_name: 'i', type: 'ee', code: "건건", col4: "데이터 5-1", col5: "결과 5-1" },
  // { group_name: 'j', type: 'ee', code: "시간", col4: "데이터 5-2", col5: "결과 5-2" },
  // { group_name: 'k', type: 'ff', code: "건건", col4: "데이터 6-1", col5: "결과 6-1" },
  // { group_name: 'l', type: 'ff', code: "시간", col4: "데이터 6-2", col5: "결과 6-2" },
]

// 그런 다음 computed 속성을 통해 테이블 데이터로 변환할 수 있습니다
const tableData2 = computed(() => {
  return data.map((row, index) => {
    return {
      col1: index % 12 === 0 ? row.group_name : null,
      col2: index % 2 === 0 ? row.type : null,
      col3: row.code,
      col4: row.values[index % 12],
      col5: row.values[(index+1) % 12],
      values: row.values,
    };
  });

  // const result = [];
  
  // for (let groupIndex = 0; groupIndex < data.length; groupIndex++) {
  //   const group = data[groupIndex];
    
  //   for (let i = 0; i < 12; i++) {
  //     result.push({
  //       col1: i === 0 ? group.group_name : null, // 각 그룹의 첫 번째 행에만 표시
  //       col2: i % 2 === 0 ? group.type : null,
  //       col3: group.code,
  //       // col4: group.values,
  //       col4: group.values[i],
  //       col5: group.values[(i + 1) % 12]
  //     });
  //   }
  // }
  // return result;
});
</script>

<template>
  <div p4>
    <!-- <table class="merged-table">
      <tr v-for="(row, rowIndex) in tableData2" :key="rowIndex">
        <td v-if="rowIndex === 0" :rowspan="12" class="col-1">
          {{ row.col1 }}
        </td>
        
        <td v-if="rowIndex % 2 === 0" :rowspan="2" class="col-2">
          {{ row.col2 }}
        </td>
        
        <td class="col-3">{{ row.col3 }}</td>
        <td class="col-4">{{ row.col4 }}</td>
        <td class="col-5">{{ row.col5 }}</td>
      </tr>
    </table> -->

    <table class="merged-table">
      <thead>
        <tr>
          <th class="">그룹</th>
          <th class="" colspan="2">구분</th>
          <th class="" v-for="(header, i) in 12">값 {{header}}</th>
        </tr>
      </thead>
      <tbody>
        <!-- <template v-for="(row, rowIndex) in tableData2" :key="rowIndex"> -->
          <tr v-for="(row, rowIndex) in tableData2" :key="rowIndex">
            <td v-if="rowIndex % 12 === 0" :rowspan="12" class="col-1">
              {{ row.col1 }}
            </td>
            
            <td v-if="rowIndex % 2 === 0" :rowspan="2" class="col-2">
              {{ row.col2 }}
            </td>
            
            <td class="col-3">{{ row.col3 }}</td>
            <!-- <td class="col-4">{{ row.col4 }}</td> -->
            <!-- <td class="col-5">{{ row.col5 }}</td> -->
            <td class="col-5" v-for="value in row.values">{{ value }}</td>

            <!-- <td>{{ row.values[0] }}</td>
            <td>{{ row.values[1] }}</td>
            <td>{{ row.values[2] }}</td>
            <td>{{ row.values[3] }}</td>
            <td>{{ row.values[4] }}</td>
            <td>{{ row.values[5] }}</td>
            <td>{{ row.values[6] }}</td>
            <td>{{ row.values[7] }}</td>
            <td>{{ row.values[8] }}</td>
            <td>{{ row.values[9] }}</td>
            <td>{{ row.values[10] }}</td>
            <td>{{ row.values[11] }}</td> -->
          </tr>
        <!-- </template> -->
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.merged-table {
  width: 100%;
  border-collapse: collapse;
}

.merged-table td, th {
  border: 1px solid #000;
  padding: 8px;
  text-align: center;
}

.col-1 {
  background-color: #f0f0f0;
}

.col-2 {
  background-color: #f5f5f5;
}
</style>