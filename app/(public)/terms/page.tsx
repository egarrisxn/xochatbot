export default function TermsOfServicePage() {
  return (
    <div className='container mx-auto flex max-w-2xl md:items-center'>
      <div className='grid w-full grid-rows-1'>
        <div></div>
        <div className='px-4 lg:px-0'>
          <h1 className='mb-4 text-2xl font-bold text-primary lg:mb-2 lg:text-3xl'>
            Terms of Service
          </h1>
          <p className='text-justify text-sm leading-tight lg:text-base lg:leading-normal'>
            THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
}
