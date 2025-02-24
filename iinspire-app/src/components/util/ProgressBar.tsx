import { Progress } from "@chakra-ui/react"
import { HStack } from "@chakra-ui/react"

const ProgressBar = () => {
    return (
        <Progress.Root defaultValue={40} maxW="xl">
            <HStack gap="5">
                <Progress.Label>Percent Complete</Progress.Label>
                <Progress.Track flex="1">
                    <Progress.Range />
                </Progress.Track>
                <Progress.ValueText>40%</Progress.ValueText>
            </HStack>
        </Progress.Root>
    );
}

export default ProgressBar