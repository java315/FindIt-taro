<template>
    <view :style='css'>
        ROW {{ index }} : {{ data[index] }}
    </view>
</template>
<script>
export default{
    props: ['index', 'data', 'css']
}
</script>
