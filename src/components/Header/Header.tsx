import { TonConnectButton } from '@tonconnect/ui-react';
import * as styles from './Header.module.css';
import React from 'react';
interface HeaderProps {
    
}

export default function Header(props: HeaderProps) {
    const {

    } = props
    return (
        <header className={ styles.Header }>
            <TonConnectButton />
        </header>
    )
}
