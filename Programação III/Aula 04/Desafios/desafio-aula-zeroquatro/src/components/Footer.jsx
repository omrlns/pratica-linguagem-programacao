export default function Footer({ author }) {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} - Projeto Desenvolvido por {author}.</p>
        </footer>
    );
}