"use client"
import React from 'react';
import { Button, Flex, Image, Stack, Spacer } from '@chakra-ui/react';
import Link from 'next/link';
import colors from '../../../public/colors';
import fonts from '../../../public/fonts';
import { useAuth } from "@/context/auth-context";

function Navbar() {
    const { logout, getHomePath, isAuthenticated, user } = useAuth();

    // Base items that are always visible on Navbar
    const BASE_ITEMS: Array<NavItem> = [
        { label: 'About', href: '/about' }
    ];

    // Items only shown when authenticated
    const getAuthItems = () => {
        const items: Array<NavItem> = [
            { label: 'Home', href: getHomePath() }
        ];
        
        // Only add Survey if user is a student (case-insensitive check)
        if (user?.role.toLowerCase() === 'student') {
            items.push({ label: 'Survey', href: '/student-survey' });
        }
        
        return items;
    };

    // Combine items based on auth status
    const NAV_ITEMS = [
        ...BASE_ITEMS,
        ...(isAuthenticated ? getAuthItems() : [])
    ];

    return (
        <Flex as="nav" align="center" p={2} boxShadow="md" bg={colors.secondary_blue_dark}>
            {/* Logo */}
            <Image 
                src="/images/custom/tree_sprout_new.png"
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
                            color="white"
                            _hover={{ bg: colors.secondary_blue_light }}
                        >
                            {navItem.label}
                        </Button>
                    </Link>
                ))}
            </Stack>

            {/* Push Sign Out button to the right */}
            <Spacer />

            {isAuthenticated && (
                <Button 
                    colorScheme="red" 
                    variant="outline"
                    bg={colors.off_white}
                    color={colors.black}
                    fontSize={fonts.default_font_size} 
                    fontWeight={fonts.default_weight}
                    onClick={() => logout()}
                >
                    Sign Out
                </Button>
            )}
        </Flex>
    );
}

export default Navbar;

interface NavItem {
    label: string;
    href?: string;
}