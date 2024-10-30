import TwitterIcon from '../../../assets/twitter';
import InstagramIcon from '../../../assets/instagram';
import YouTubeIcon from '../../../assets/youtube';
import LinkedInIcon from '../../../assets/linkedin';
import '../../styles/uiStyles/uiStyles.css';


export const Footer = () => {
    return (
        <footer className="footer">
            <div className="social">
                <div className='icon'><TwitterIcon/></div>
                <div className='icon'><InstagramIcon/></div>
                <div className='icon'><YouTubeIcon/></div>
                <div className='icon'><LinkedInIcon/></div>
            </div>
            <div>
                <p style={{marginTop:"15px"}}>© 20204. Enterprise Control AG.</p>
            </div>
        </footer>
        
    )
}
