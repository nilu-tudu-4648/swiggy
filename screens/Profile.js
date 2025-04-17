import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppButton from '../components/AppButton';
import { STYLES, COLORS, SIZES, FONTS } from '../components/constants/theme';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileItem = ({ icon, title, subtitle, onPress }) => (
    <TouchableOpacity style={styles.profileItem} onPress={onPress}>
        <View style={styles.profileItemLeft}>
            <View style={styles.profileItemIcon}>
                <MaterialCommunityIcons name={icon} size={24} color={COLORS.primary} />
            </View>
            <View style={styles.profileItemText}>
                <Text style={styles.profileItemTitle}>{title}</Text>
                {subtitle && <Text style={styles.profileItemSubtitle}>{subtitle}</Text>}
            </View>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.lightgray1} />
    </TouchableOpacity>
);

const Profile = () => {
    const navigation = useNavigation()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    setUser(JSON.parse(userData));
                }
            } catch (error) {
                console.log('Error fetching user data:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user')
            setUser(null);
            navigation.navigate('LoginScreen')
        } catch (error) {
            console.log('Error logging out:', error.message)
        }
    }

    if (loading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.profileImageContainer}>
                    {user?.profileImage ? (
                        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
                    ) : (
                        <View style={styles.profileImagePlaceholder}>
                            <Text style={styles.profileImageText}>
                                {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || '?'}
                            </Text>
                        </View>
                    )}
                    <TouchableOpacity style={styles.editImageButton}>
                        <MaterialCommunityIcons name="camera" size={18} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.userName}>
                    {user ? user.name || user.email || 'User' : 'Guest User'}
                </Text>
                {user?.email && <Text style={styles.userEmail}>{user.email}</Text>}
                <TouchableOpacity style={styles.editProfileButton}>
                    <Text style={styles.editProfileText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            {/* Orders Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>My Orders</Text>
                <ProfileItem 
                    icon="clock-outline" 
                    title="Order History" 
                    subtitle="View your past orders"
                    onPress={() => navigation.navigate('Order')}
                />
                <ProfileItem 
                    icon="star-outline" 
                    title="Favorite Orders" 
                    subtitle="Quick reorder from your favorites"
                    onPress={() => {}}
                />
                <ProfileItem 
                    icon="heart-outline" 
                    title="My Wishlist" 
                    subtitle="Products you've saved for later"
                    onPress={() => navigation.navigate('MyWishlist')}
                />
            </View>

            {/* Account Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account Settings</Text>
                <ProfileItem 
                    icon="home-outline" 
                    title="Saved Addresses" 
                    subtitle="Manage your delivery locations"
                    onPress={() => {}}
                />
                <ProfileItem 
                    icon="credit-card-outline" 
                    title="Payment Methods" 
                    subtitle="Manage your payment options"
                    onPress={() => {}}
                />
                <ProfileItem 
                    icon="bell-outline" 
                    title="Notifications" 
                    subtitle="Manage your notifications"
                    onPress={() => {}}
                />
            </View>

            {/* Help Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Help & Feedback</Text>
                <ProfileItem 
                    icon="help-circle-outline" 
                    title="Help Center" 
                    subtitle="Find answers to your questions"
                    onPress={() => {}}
                />
                <ProfileItem 
                    icon="message-text-outline" 
                    title="Contact Support" 
                    subtitle="We're here to help"
                    onPress={() => {}}
                />
                <ProfileItem 
                    icon="star-outline" 
                    title="Rate Our App" 
                    subtitle="Tell us what you think"
                    onPress={() => {}}
                />
            </View>

            {/* Logout Button */}
            <AppButton 
                title={'Logout'} 
                style={styles.logoutButton} 
                onPress={logout}
            />
            
            {/* App version */}
            <Text style={styles.versionText}>Version 1.0.0</Text>
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightgray,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        backgroundColor: COLORS.white,
        paddingVertical: 30,
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    profileImagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImageText: {
        fontSize: 40,
        color: COLORS.white,
        fontWeight: 'bold',
    },
    editImageButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.secondary,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.white,
        elevation: 3,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
        color: COLORS.black,
    },
    userEmail: {
        fontSize: 14,
        color: COLORS.lightgray1,
        marginBottom: 15,
    },
    editProfileButton: {
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: COLORS.lightgray,
        borderWidth: 1,
        borderColor: COLORS.primary,
        minWidth: 150,
        alignItems: 'center',
    },
    editProfileText: {
        color: COLORS.primary,
        fontWeight: '500',
        fontSize: 14,
    },
    section: {
        backgroundColor: COLORS.white,
        marginBottom: 15,
        borderRadius: 15,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2.22,
        elevation: 3,
        marginHorizontal: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: COLORS.black,
    },
    profileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightgray,
        minHeight: 60,
    },
    profileItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    profileItemIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.lightgray,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    profileItemText: {
        flex: 1,
    },
    profileItemTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.black,
    },
    profileItemSubtitle: {
        fontSize: 13,
        color: COLORS.lightgray1,
        marginTop: 3,
    },
    logoutButton: {
        marginVertical: 20,
        marginHorizontal: 15,
        width: 'auto',
        paddingVertical: 12,
        borderRadius: 10,
    },
    versionText: {
        textAlign: 'center',
        color: COLORS.lightgray1,
        fontSize: 12,
        marginBottom: 30,
    },
})