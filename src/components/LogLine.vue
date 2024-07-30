<script>
import { Clause } from "../utils/clause"

export default {
    props: {
        log_line: Array,
        terminal_line_length: Number,
        cursor_index: Number
    },
    computed: {
        lines() {
            let rest_length = this.terminal_line_length
            let lines = [[]]

            this.log_line.forEach(clause => {
                if (rest_length == 0) {
                    lines.push([])
                    rest_length = this.terminal_line_length
                }

                if (clause.length > rest_length) {
                    const left = clause.slice(0, rest_length)
                    let right = clause.slice(rest_length)
                    lines[lines.length - 1].push(left)
                    while (right.length > this.terminal_line_length) {
                        lines.push([right.slice(0, this.terminal_line_length)])
                        right = right.slice(this.terminal_line_length)
                    }
                    lines.push([right])
                    rest_length = this.terminal_line_length - clause.length + rest_length
                }
                else {
                    lines[lines.length - 1].push(clause.copy())
                    rest_length -= clause.length
                }
            })

            if (this.cursor_index === undefined) {
                return lines
            }
            else if (this.cursor_index === 0) {
                const last_line = lines[lines.length - 1]
                const cursor = new Clause(" ").Cls("cursor")
                last_line.push(cursor)
                return lines
            }
            else {
                let rest_cursor_index = this.cursor_index
                for (let i = lines.length - 1; i >= 0; i--) {
                    const line = lines[i]
                    for (let j = line.length - 1; j >= 0; j--) {
                        const clause = line[j]
                        if (clause.length >= rest_cursor_index) {
                            const index = clause.length - rest_cursor_index
                            const left = clause.slice(0, index)
                            const cursor = clause.slice(index, index + 1).Cls("cursor")
                            const right = clause.slice(index + 1)
                            line.splice(j, 1, left, cursor, right)
                            return lines
                        }
                        else {
                            rest_cursor_index -= clause.length
                        }
                    }
                }
            }
            return lines
        }
    }
}
</script>

<template>
    <div class="log_line" v-for="line in lines">
        <p class="clause" v-for="{ text, cls, style, click } in line" :class="cls" :style="style" @click="click">
            {{ text }}
        </p>
    </div>
</template>

<style scoped>
.log_line {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    white-space: pre;
    font-family: 'Courier New', monospace;
    font-size: large;
}

.clause {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    display: inline-block;
}

.cursor {
    animation: blink 1s infinite;
}

@keyframes blink {

    0%,
    100% {
        background-color: white;
    }

    50% {
        background-color: transparent;
    }
}
</style>
