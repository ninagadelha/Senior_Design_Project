import React from 'react'
import { Box, Button, HStack, Icon, Text, VStack} from '@chakra-ui/react';
import { IoBarChartSharp } from "react-icons/io5";
import colors from '../../../public/colors';
import '../../../public/styles/dashboard.css';


function DashboardBox(){
    return(
        <Box className='dashboard-box'>
            <HStack className='dashboard-box-stack'>
                <Icon color={colors.black_text}>
                    <IoBarChartSharp />
                </Icon>

                <VStack className='dashboard-box-text-stack'>
                    <Text>
                        Results
                    </Text>
                    <Text>
                        View Survey Results
                    </Text>
                </VStack>

                <Button>

                </Button>
            </HStack>
        </Box>    
        );
}

export default DashboardBox