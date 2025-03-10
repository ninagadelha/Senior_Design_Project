import React from 'react';
import { Button, Flex, Image, Stack, Spacer } from '@chakra-ui/react';
import Link from 'next/link';
import colors from '../../../public/colors';
import fonts from '../../../public/fonts';

function Navbar() {
    return (
        <Flex as="nav" align="center" p={2} boxShadow="md" bg={colors.secondary_blue_dark}>
            {/* Logo */}
            <Image 
                src="/images/custom/IINSPIRE_logo_transparent_light.png" 
                alt="logo" 
                h="7vh" 
                objectFit="contain"
            />

            {/* Navigation Items */}
            <Stack direction="row" gap={4} ml={8}>
                {NAV_ITEMS.map((navItem) => (
                    <Link key={navItem.label} href={navItem.href ?? '#'} passHref>
                        <Button 
                            variant="ghost"
                            fontSize={fonts.default_font_size} 
                            fontWeight={fonts.default_weight}
                            _hover={{ bg: colors.secondary_blue_light }}
                        >
                            {navItem.label}
                        </Button>
                    </Link>
                ))}
            </Stack>

            {/* Push Sign Out button to the right */}
            <Spacer />

            <Button 
                colorScheme="red" 
                variant="outline"
                bg={colors.off_white}
                color={colors.black}
                fontSize={fonts.default_font_size} 
                fontWeight={fonts.default_weight}
            >
                Sign Out
            </Button>
        </Flex>
    );
}

export default Navbar;

interface NavItem {
    label: string;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    { label: 'Home', href: '/student-home' },
    { label: 'About', href: '/about' }, 
    { label: 'Survey', href: '/student-survey' },
];
