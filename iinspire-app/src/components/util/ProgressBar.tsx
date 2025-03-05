import { HStack, Progress, Text } from "@chakra-ui/react"

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  // Safely calculate progress percentage
  const safeTotal = total || 1 // Prevent division by zero
  const progress = Math.min(100, (current / safeTotal) * 100)

  return (
    <Progress.Root value={progress} width="full" mb={6}>
      <HStack gap="5" width="full">
        <Progress.Label flexShrink={0}>
          Step {current} of {total}
        </Progress.Label>
        <Progress.Track flex="1">
          <Progress.Range />
        </Progress.Track>
        <Progress.ValueText flexShrink={0}>
          {Math.round(progress)}%
        </Progress.ValueText>
      </HStack>
    </Progress.Root>
  )
}

export default ProgressBar