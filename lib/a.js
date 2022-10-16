async function check(item) {
  return new Promise((resolve) => setTimeout(() => resolve(item * 2), 200))
}

const a = [1, 2, 3, 4, 5]

async function main() {
  const result = []
  for (const item of a) {
    result.push(await check(item))
  }
  console.log(result)
}

main()
