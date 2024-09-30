export const Caret = ({ color = '#000', styles = '' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        className={`${styles}`}
    >
        <path
            fill={color}
            fillRule="evenodd"
            d="M9.399 4.328a.75.75 0 0 1 1.06 0l6.364 6.363a1.75 1.75 0 0 1 0 2.475L10.46 19.53a.75.75 0 0 1-1.06-1.06l6.364-6.364a.25.25 0 0 0 0-.354L9.399 5.388a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
        />
    </svg>
)

export const OverviewIcon = ({ color = '#000' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
    >
        <title>{"Overview"}</title>
        <g fill="none" fillRule="evenodd">
            <path d="M0 0h24v24H0z" />
            <path
                stroke={color}
                strokeDasharray="0,0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 10.571V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7.429"
            />
            <path
                stroke={color}
                strokeDasharray="0,0"
                strokeLinecap="round"
                strokeWidth={2}
                d="M18 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            />
            <path
                stroke={color}
                strokeDasharray="0,0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m8 15 3-4 2 2 3-4"
            />
        </g>
    </svg>
)

export const InvoiceIcon = ({ color = '#000' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
    >
        <g fill={color}>
            <path
                fillRule="evenodd"
                d="M6.553 1.606C7.109 1.327 7.773 1 9 1c1.226 0 1.89.327 2.447.605l.016.008C11.9 1.831 12.236 2 13 2c1.237 0 1.97-.461 2.214-.645.38-.286.83-.262 1.14-.118.314.145.646.492.646 1.004V13h3a3 3 0 0 1 3 2.999V19c0 .925-.234 1.685-.637 2.29a3.632 3.632 0 0 1-1.416 1.23c-.49.244-.967.362-1.314.42A3.83 3.83 0 0 1 19 23H5c-.925 0-1.685-.234-2.29-.637a3.632 3.632 0 0 1-1.23-1.416A4.686 4.686 0 0 1 1 19V2.241c0-.512.332-.859.646-1.004.31-.144.76-.168 1.14.118C3.03 1.54 3.763 2 5 2c.764 0 1.101-.169 1.537-.387l.016-.007ZM3.003 19 3 3.684C3.54 3.866 4.207 4 5 4c1.227 0 1.89-.327 2.447-.606l.016-.008C7.9 3.17 8.236 3 9 3c.764 0 1.101.169 1.537.386l.016.008C11.109 3.673 11.773 4 13 4c.793 0 1.46-.134 2-.316V19c0 .783.168 1.448.463 2H5c-.575 0-.94-.14-1.18-.3a1.635 1.635 0 0 1-.55-.647A2.69 2.69 0 0 1 3.002 19Zm16.301 1.967c.216-.036.489-.106.749-.236.256-.129.482-.305.646-.551.16-.24.301-.605.301-1.18v-3.001A1 1 0 0 0 20 15h-3v4c0 .575.14.94.3 1.18.165.246.39.422.647.55a2.688 2.688 0 0 0 .995.267c.12.008.244-.01.362-.03Z"
                clipRule="evenodd"
            />
            <path d="M5 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1ZM5 12a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1ZM5 16a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z" />
        </g>
    </svg>
)

export const InventoryIcon = ({ color = '#000' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
    >
        <path
            fill={color}
            d="M4.4 3A1.4 1.4 0 0 0 3 4.4V6a1 1 0 0 1-2 0V4.4A3.4 3.4 0 0 1 4.4 1H6a1 1 0 0 1 0 2H4.4ZM17 2a1 1 0 0 1 1-1h1.6A3.4 3.4 0 0 1 23 4.4V6a1 1 0 1 1-2 0V4.4A1.4 1.4 0 0 0 19.6 3H18a1 1 0 0 1-1-1ZM2 17a1 1 0 0 1 1 1v1.6A1.4 1.4 0 0 0 4.4 21H6a1 1 0 1 1 0 2H4.4A3.4 3.4 0 0 1 1 19.6V18a1 1 0 0 1 1-1Zm20 0a1 1 0 0 1 1 1v1.6a3.4 3.4 0 0 1-3.4 3.4H18a1 1 0 1 1 0-2h1.6a1.4 1.4 0 0 0 1.4-1.4V18a1 1 0 0 1 1-1Zm-4-9a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Zm-3 1a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0V9Zm-5-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1ZM7 9a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0V9Z"
        />
    </svg>
)

export const AddIcon = ({ color = '#000' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
    >
        <title />
        <g
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            data-name="add"
        >
            <path d="M12 19V5M5 12h14" />
        </g>
    </svg>
)

export const NotificationIcon = ({ color = '#000' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
    >
        <title />
        <g
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
        >
            <path d="M18.9 11.2s0-8.7-6.9-8.7-6.9 8.7-6.9 8.7v3.9l-2.6 2.4h19l-2.6-2.4ZM14.5 20.5s-.5 1-2.5 1-2.5-1-2.5-1" />
        </g>
    </svg>
)

export const TrendingIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
    >
        <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m21 7-6.586 6.586a2 2 0 0 1-2.828 0l-1.172-1.172a2 2 0 0 0-2.828 0L3 17M21 7h-6m6 0v6"
        />
    </svg>
)